var client = Stomp.client(msgsUrl);
var clid;
var plTime = 0;
var queueProcData = {};
var cbQueue = null;
var reqType = 200;
var responseReceived = false;

function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}
var setRzMsgsUid = function(id) {
    uid = id;
    unSub();
    clSubscribe();
};
$(document).ready(function() {
    $(window).focus(function() {
        if (ajxRed !== "y" && connectedStatus == false) {
            reconnectRbt();
        }
    });
    plTime = getCurrentTimestamp();
});

function updateQueueAct(hasCallback = false) {
    var formData = {
        q: mq,
        rzt: rzt
    };
    var successCallback = function(resp) {
        if (resp.code !== undefined) {
            if (resp.code == 200) {
                mq = resp.mq;
                uid = mq;
                liuid = mq;
                unSub();
                client.disconnect();
                connectedStatus = false;
                reconnectRbt(hasCallback);
            }
        }
    };
    xhrRequest(
        ajax_url + "job/updateQueue",
        "POST",
        formData,
        successCallback
    );
}

/*if (ajxRed !== "y") {
  setInterval(function() {
    updateQueueAct();
  }, 60000 * 5);
  
}

*/
if (ajxRed !== "y") {
    setInterval(function() {
        if (connectedStatus == false) {
            if (connetedTries < 20) {
                connetedTries++;
                reconnectRbt();
            }
        }
    }, 60000 * 15);
}

var clSend = function(data, cb, hasCallback = false) {
    console.log('i am called');
    queueProcData = data;
    cbQueue = cb;
    responseReceived = false;

    if (typeof data.cnt == 'undefined')
        cnt = 'job';
    else
        cnt = data.cnt;

    if (connectedStatus == false || ajxRed == "y") {
        var formData = data.data;
        formData.rzTkn = rzTkn;

        $.ajax({
                url: ajax_url + cnt + "/" + data.act,
                type: "POST",
                data: formData
            })
            .done(function(response) {
                window[data.act](response);
            })
            .fail(function(res) {
                //alert('failed')
            });
    } else {

        if (reqType !== 200) {
            if (!hasCallback) {
                return false;
            }
        }

        let cdata = {};
        cdata.data = JSON.stringify(data);
        cdata.uid = uid;
        cdata.act = data.act;
        cdata.liuid = liuid;
        cdata.__mod = typeof mod != "undefined" ? mod : '';
        cdata.__c = cnt;
        cdata.locale = locale;
        client.send("/queue/" + msgsQid, {}, JSON.stringify(cdata));
        if (typeof cb == 'function')
            cb();
        //callbackShiftManager(rbtReqTtl);
    }
};


if (ajxRed !== "y") {
    $(document).on("click", function(e) {
        let currTime = getCurrentTimestamp();
        if (typeof plTime == "number" && plTime > 0) {
            let calcTime = currTime - plTime;
            if (calcTime > ttlDef) {
                reqType = 404;
                updateQueueAct(true);
            } else {
                reqType = 200;
            }
        }
        plTime = currTime;
    });
}

var clSubscribe = function() {
    clid = client.subscribe(
        "/queue/" + uid,
        function(m) {
            var json = JSON.parse(m.body);
            //var custData = JSON.parse(json.data);
            //if (json.resp !== null) {
            switch (json.act) {
                case "accessDenied":
                    reqType = 404;
                    ajxRed = 'y';
                    clSend(queueProcData, cbQueue, true);
                    //updateQueueAct(true);
                    //alert(json.resp.msg);
                    //window.location.reload();
                    // showMsg({'status': false, message: json.resp.msg});
                    break;
                default:
                    if (typeof window[json.act] !== "undefined") {
                        queueProcData = {};
                        cbQueue = null;
                        reqType = 200;
                        responseReceived = true;
                        window[json.act](json.resp);
                    }
            }
            //}
        }, {
            "x-expires": qExp
        }
    );
};

var reconInterval;
var rctConnected = false;
var rctConnect = function() {
    if (window.gReact != "undefined") window.gReact.connectReq();
};
var onConnect = function(x) {
    clearInterval(reconInterval);
    clSubscribe();
    //initLoad();
    //loadDBReq();
    updateConnectionStatus("online", true);
};

function reconnectRbt(hasCallback = false) {
    client = Stomp.client(msgsUrl);
    client.connect(
        msgsUid,
        msgsPhrase,
        function() {
            clearInterval(reconInterval);
            connectedStatus = true;
            onConnect();

            if (hasCallback && reqType == 404) {
                clSend(queueProcData, cbQueue, true);
            }
        },
        function() {
            if (connectedStatus) {
                onError();
            }
        },
        msgsVH
    );
}
var connetedTries = 0;
var onError = function(err) {
    updateConnectionStatus("offline", false);
    //log("Error:" + err);
    var connectedStatus = false;
    var reconTime = 5000; //5 sec
    //if (typeof err === 'undefined' || err.indexOf('Lost connection') > 0) {
    reconInterval = setInterval(function() {
        if (connetedTries <= 3) {
            //log("connected re");
            reconnectRbt();
        }
        connetedTries++;
    }, reconTime);
    //}
};
client.debug = function(response) {
    rbtLog("Response:" + response + "\n");
};
if (ajxRed !== "y") {
    var msgs = function() {
        client.connect(msgsUid, msgsPhrase, onConnect, onError, msgsVH);
    }.call();
}
var unSub = function() {
    out = clid.unsubscribe();
};

function expires(data) {
    if (typeof data == "object") {
        if (
            data.ttl !== undefined &&
            data.tst !== undefined &&
            typeof tst != "undefined"
        ) {
            let ttl = parseInt(data.ttl);
            let tstServ = parseInt(data.tst);
            if (tstServ - tst >= ttl) {
                unSub();
                client.disconnect();
                connectedStatus = false;
            }
            tst = tstServ;
        }
    }
}