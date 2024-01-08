/*
 * ADD CUSTOM VALIDATION RULES
 */

$.validator.addMethod("validUsernameOrEmail", function(value, element) {
    var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    var userNameRegex = /^[0-9a-zA-Z_]+$/;
    if (value.indexOf('@') > 0) {
        return this.optional(element) || emailRegex.test(value);
    } else {
        return this.optional(element) || userNameRegex.test(value);
    }
}, "Enter valid username or email");

$.validator.addMethod("username", function(value, element) {
    return this.optional(element) || /^[0-9a-zA-Z_]+$/.test(value);
}, "Only letters, numbers and underscore allowed");

jQuery.validator.addMethod("zipCode", function(value, element) {
    return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
}, "Enter valid zip/postal code.");

/*
 * Rule For Saudi NIC Number
 * start with: 1
 * and must be 10 digits in limit
 */
var saudiLabel = (typeof siteLang !== "undefined" && siteLang == 'ar') ? "أدخل رقم هوية سعودية صحيحة. (يبدأ بـ 1 ومكون من 10 أرقام)" : "Enter valid Saudi NIC. (Start from 1 and 10 characters long)";
jQuery.validator.addMethod("saudiNIC", function(value, element) {
    return this.optional(element) || /^1[0-9].*$/.test(value);
}, saudiLabel);

/*
 * Supports :
 *   (123) 456 7899
 *   (123)-456-7899
 *   123-456-7899
 *   123 456 7899
 *   1234567899
 */
jQuery.validator.addMethod("phone", function(value, element) {
    return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(value);
}, "Enter valid phone number.");

jQuery.validator.addMethod("mobile", function(value, element) {
    return this.optional(element) || /^[1-9]{1,2}[0-9]{10}$/.test(value);
}, "Enter valid phone number.");

$.validator.addMethod("alphaNumeric", function(value, element) {
    return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value);
}, "Only letters, numbers and dash(-) allowed");

// atleast one character and atleast one number is allowed
$.validator.addMethod("rozeePassword", function(value, element) {
    return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
}, pwdMsg);

// adding custom validation less than or equal to
$.validator.addMethod('lessThanEqual', function(value, element, param) {
    return this.optional(element) || parseInt(value) <= parseInt($(param).val());
}, "This value must be less than his respective value");

// adding custom validation greater than or equal to
$.validator.addMethod('greaterThanEqual', function(value, element, param) {
    return this.optional(element) || parseInt(value) <= parseInt($(param).val());
}, "This value must be greater than his respective value");

$.validator.addMethod(
    'australianDate',
    function(value, element) {
        // put your own logic here, this is just a (crappy) example 
        return value.match(/^\d\d?-\d\d?-\d\d\d\d$/);
    },
    'Please enter a date in the format DD-MM-YYYY'
);



/*
 *      END HERE 
 * 
 * - START CUSTOM VALIDATION RULES
 */

jQuery.validator.addMethod('atLeastOneChecked', function(value, element) {
    return ($('input[name=keyword_search_in]:checked').length > 0);
});


jQuery.validator.addMethod("multiemail", function(value, element) {
    if (this.optional(element)) {
        return true;
    }

    var emails = value.split(','),
        valid = true;

    for (var i = 0, limit = emails.length; i < limit; i++) {
        value = emails[i];
        value = value.trim();
        valid = valid && jQuery.validator.methods.email.call(this, value, element);
    }

    return valid;
}, msg_multiemail_error);

/*
 * LOGIN FORM VALIDATION
 */
$('#saveJobAlert-form').validate({
    rules: {
        'keyword_search_in[]': {
            atLeastOneChecked: true
        },
        careerLevel: {
            required: true
        },
        gender: {
            required: true
        },
        minExperience: {
            required: true
        },
        expSalary: {
            required: true
        },
        city: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        mobileCode: {
            digits: true,
            required: true
        },
        mobileNumber: {
            digits: true,
            required: true,
            minlength: 7,
            maxlength: 10
        }
    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        //loginFormSubmitHandler(form);
    }
});


/*
 * REGISTER FORM VALIDATION
 */
$('#hRegisterFrom').validate({
    rules: {
        activation_code: {
            required: true,
            minlength: 4,
            maxlength: 60
        }
    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        //loginFormSubmitHandler(form);
    }
});


/*
 * PA CALL FORM VALIDATION
 */
$('#callPA-form').validate({
    rules: {
        full_name: {
            required: true,
            maxlength: 85
        },
        mobile: {
            required: true,
            minlength: 7,
            maxlength: 16,
            digits: true
        }
    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        //loginFormSubmitHandler(form);
    }
});


/*
 * PA CALL FORM VALIDATION
 */
$('#queryPA-form').validate({
    rules: {
        full_name: {
            required: true,
            maxlength: 85
        },
        mobile: {
            required: true,
            minlength: 7,
            maxlength: 16,
            digits: true
        },
        email: {
            required: true,
            email: true,
            maxlength: 100
        },
        message: {
            required: true,
            maxlength: 2000
        }
    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        //loginFormSubmitHandler(form);
    }
});

/*
 * SEND MESSAGE FORM VALIDATION
 */
$('#sendMessageForm').validate({
    rules: {
        subject: {
            required: true,
            maxlength: 35
        },
        message: {
            required: true,
            minlength: 7,
            maxlength: 2000
        }
    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        //loginFormSubmitHandler(form);
    }
});

/*
 * SEND MESSAGE FORM VALIDATION
 */
$('#updateProfileForm').validate({
    rules: {
        city: {
            required: true
        },
        userRole: {
            required: true
        },
        company_address: {
            required: true
        },
        NIC: {
            maxlength: function() {
                return $('#cnic').hasClass('internat') ? 20 : 13;
            },
            minlength: function() {
                return $('#cnic').hasClass('internat') ? 4 : 13;
            },
        },
        industry_id: {
            required: true,
        },
        no_of_employee: {
            required: true
        },
        company: {
            required: true,
        },
        cnicIssueDate: {
            required: function() {
                return $('#cnic').val() != '' ? true : false;
            }
        }

    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.hcpselwrapr').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        form.id.submit();
    }
});


/*
 * SEND MESSAGE FORM VALIDATION
 */
$('#forwardCandidate').validate({
    rules: {
        recEmail: {
            required: true,
            multiemail: true,
            //email: true
        },
        comments: {
            required: true,
            minlength: 7,
            maxlength: 2000
        }

    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.hcpselwrapr').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        form.id.submit();
    }
});

$('#rejectApplicantForm').validate({
    rules: {
        reason: {
            required: true
        },
        comments: {
            required: true,
            minlength: 7,
            maxlength: 2000
        },
        subject: {
            required: true,
            minlength: 5,
            maxlength: 2000
        },
        content: {
            required: true,
            minlength: 5,
            maxlength: 2000
        },
        message: {
            required: true,
            minlength: 5,
            maxlength: 2000
        }

    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.hcpselwrapr').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        form.id.submit();
    }
});



$('#addCandidateForm').validate({
    rules: {
        name: {
            required: true,
            minlength: 7,
            maxlength: 200
        },
        email: {
            required: true,
            email: true
        },
        cand_country: {
            required: true
        },
        cand_city: {
            required: true
        },
        mobile: {
            required: true,
            minlength: 7,
            digits: true
        }


    },
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if (element.parent('.hcpselwrapr').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function(form) {
        form.id.submit();
    }
});