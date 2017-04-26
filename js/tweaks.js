// Prevent other weird shit to type to prevent unexpected errors
$('input').keypress(function(e) {    
    if(!/[0-9a-zA-Z!@#$%^&*:()<>?,.~`-+\\/]/.test(String.fromCharCode(e.which)))
        return false;
});