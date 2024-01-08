var google;

function codeLatLng(lat, lng) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                var indice = 0;
                for (var j = 0; j < results.length; j++) {
                    if (results[j].types[0] == 'locality') {
                        indice = j;
                        break;
                    }
                }
                for (var i = 0; i < results[j].address_components.length; i++) {
                    if (results[j].address_components[i].types[0] == 'locality') {
                        //this is the object you are looking for
                        city = results[j].address_components[i];
                    }
                    if (results[j].address_components[i].types[0] == 'administrative_area_level_1') {
                        //this is the object you are looking for
                        region = results[j].address_components[i];
                    }
                    if (results[j].address_components[i].types[0] == 'country') {
                        //this is the object you are looking for
                        country = results[j].address_components[i];
                    }
                }

                //city data
                var userLocation = {};
                userLocation.city = city.long_name;
                userLocation.country = country.long_name;
                if (String(userLocation.city) != 'null') {
                    userLocation.city_id = $('[name=city] option:contains("' + userLocation.city + '")').val();
                }
                if (typeof userLocation.country_id == 'undefined') {
                    $.ajax({
                        url: ajax_url + 'site/getCountryByName/?countryName=' + userLocation.country,
                        dataType: 'json',
                        async: false,
                        success: function(response) {
                            if (response.success) {
                                userLocation.country_id = response.country_id;
                            }
                        }
                    });
                }
                // get city_id from server
                /*                
                 if (typeof userLocation.city_id == 'undefined') { // city_id was not found from the dropdown
                 $.ajax({
                 url: ajax_url + 'site/getcities/?country_id=' + userLocation.country_id,
                 dataType: 'json',
                 async: false,
                 success: function (response) {
                 if (response.success) {
                 $.each(response.cities, function (index, item) {
                 if (item.city == userLocation.city) {
                 userLocation.city_id = item.cityID;
                 return false;
                 }
                 });
                 }
                 }
                 });
                 }
                 */
                setUserLocation(userLocation);
                prePopulateUserLocation();
            } else {
                console.log('No results found');
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    });
}

function setUserLocation(userLocationNew) {
    var userLocationOld = getUserLocation(); // get old location
    var city = (userLocationNew.city != undefined) ? userLocationNew.city : userLocationOld.city;
    var city_id = (userLocationNew.city_id != undefined) ? userLocationNew.city_id : userLocationOld.city_id;
    var country = (userLocationNew.country != undefined) ? userLocationNew.country : userLocationOld.country;
    var country_id = (userLocationNew.country_id != undefined) ? userLocationNew.country_id : userLocationOld.country_id;
    localStorage.setItem('userLocation.city', city);
    localStorage.setItem('userLocation.city_id', city_id);
    localStorage.setItem('userLocation.country', country);
    localStorage.setItem('userLocation.country_id', country_id);
}

function getUserLocation() {
    var userLocation = {};
    userLocation.city = localStorage.getItem('userLocation.city');
    userLocation.city_id = localStorage.getItem('userLocation.city_id');
    userLocation.country = localStorage.getItem('userLocation.country');
    userLocation.country_id = localStorage.getItem('userLocation.country_id');
    return userLocation;
}

function prePopulateUserLocation() {
    var userLocation = getUserLocation();
    if (typeof seletedCityLocId !== "undefined") {
        if (seletedCityLocId.length == 0) {
            if (userLocation.city_id > 1) {
                if (typeof window.gReact !== 'undefined') {
                    /*
                    if(applyLoc == 'y') {
                        let cityIdN = userLocation.city_id;
                        seletedCityAdvFilters = cityIdN;
                        seletedCityLoc = cityIdN;
                        seletedCityLocId = cityIdN;
                        window.gReact.jobSearchLocation(cityIdN);
                    }
                    */
                }
            }
        }
    }

    if (userLocation.city_id > 1) {
        try {
            $('#search_form, #advancedSearch').find('[name=city]').val(userLocation.city_id).selectpicker('refresh');
            $elem = $("#homeSearchCity");
            if (elem !== undefined) {
                if ($elem.length > 0) {
                    $("#homeSearchCity").val(userLocation.city_id);
                }
            }
        } catch (e) {
            //
        }
    }

}
$(function() {
    if (String(getUserLocation().city) == 'null') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                codeLatLng(lat, lng);
            }, function() {
                console.log('Geocoder failed');
            });
        }
    }
    prePopulateUserLocation();
    $(document).on('submit', '#search_form, #advancedSearch', function() {
        var city_id = $(this).find('[name=city]').val();
        var city = $(this).find('[name=city] option:selected').text();
        setUserLocation({
            'city_id': $(this).find('[name=city]').val(),
            city: (city_id > 0) ? city : ''
        });
    });
});