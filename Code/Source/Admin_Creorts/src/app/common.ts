import { Headers, RequestOptions, Http, URLSearchParams } from '@angular/http';

export class Common {

    static required(control: any) {
        console.log(control.value)
        return control.value !== undefined && control.value !== null && control.value.trim() == '' ?
            { "required": true } :
            null;
    }

    static emailValidator(control: any) {
        // RFC 2822 compliant regex
        // console.log("form validation email")
        // console.log(control.value)
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static specialcharValidator(control: any) {
      
        if (control.value.match(/[a-zA-Z][a-zA-Z ]+/)) {
            return null;
        } else {
            return { 'invalidCharacters': true };
        }
    }


    static passwordValidator(control: any) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static addressValidator(control: any) {
        if (control.value.match(/^[a-zA-Z0-9\s,.-@/]*$/)) {
            return null;
        } else {
            return { 'invalidAddress': true };
        }
    }
    static numberValidator(control: any) {
        let v: string = control.value;
        if (control.value.match(/^(\(?[0-9]{3}\)?)((\s|\-){1})?[0-9]{3}((\s|\-){1})?[0-9]{4}$/)) {
            return null;
        } else {
            return { 'invalidNumber': true };
        }
    }
    static checkedValidator(control: any) {
        if (control.value) {
            return null;
        } else {
            return { 'invalidCheck': true };
        }
    }
    static passwordStrength(pwString: any) {
        var strength = 0;

        strength += /[A-Z]+/.test(pwString) ? 1 : 0;
        strength += /[a-z]+/.test(pwString) ? 1 : 0;
        strength += /[0-9]+/.test(pwString) ? 1 : 0;
        strength += /[\W]+/.test(pwString) ? 1 : 0;

        return strength;
    }
    static serialize(obj: any) {
        let params: URLSearchParams = new URLSearchParams();


        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];

                params.set(key, element);
            }
        }

        return params;
    }
    static deSerialize(url: string) {
        var hash: any;
        var params = {};
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            params[hash[0]] = decodeURIComponent(hash[1]);
        }
        return params;
    }


    static keyPress(event: any) {
        // Ensure that it is a number and stop the keypress
        let value = event.target.value;
        const pattern = /[^-0-9\.]/g;
        let inputChar = String.fromCharCode(event.charCode);

        if ((pattern.test(inputChar) && event.charCode != 0) || event.charCode === 45) {

            event.preventDefault();
        } else if (((event.charCode === 46) && value.indexOf('.') != -1) && event.charCode != 0) {
            event.preventDefault();
        }
    }

    static isDeviceMobile() {
        let isMobile = false
        if ((/Android|Kindle|Silk|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) || (/android|ipad|silk|webos|iphone|ipad|ipod|firefox-os|chrome-book|windows-phone|ps4|vita|blackberry/i.test(navigator.userAgent.toLowerCase()))) {
            isMobile = true;
        }
        return isMobile;

    }


    static getBrowserDetails() {
        let browserInfo = navigator.userAgent;
        let browserFlags: any = {};
        browserFlags.ISFF = browserInfo.indexOf('Firefox') != -1;
        browserFlags.ISIE = browserInfo.indexOf('MSIE') >= 0;
        browserFlags.ISOPERA = browserInfo.indexOf('Opera') != -1;
        browserFlags.ISCHROME = browserInfo.indexOf('Chrome') != -1;
        browserFlags.ISSAFARI = browserInfo.indexOf('Safari') != -1 && !browserFlags.ISCHROME;
        return browserFlags;
    }

    static embedYoutubeUrl(newURL: string) {
        var youtubeParams: any = '?autoplay=1';

        var embedFriendlyUrl: any = "";
        var urlSections: any;
        var index: any;
        if (newURL.indexOf("vimeo") >= 0 || newURL.indexOf("youtu.be") >= 0
            || newURL.indexOf("youtube.com") >= 0) {

            if (newURL.indexOf("vimeo") >= 0) { // Displaying a vimeo video
                if (newURL.indexOf("player.vimeo") >= 0) {
                    embedFriendlyUrl = newURL;
                } else {
                    embedFriendlyUrl = newURL.replace("https:", "http:");
                    urlSections = embedFriendlyUrl.split(".com/");
                    embedFriendlyUrl = embedFriendlyUrl.replace("vimeo",
                        "player.vimeo");
                    embedFriendlyUrl = embedFriendlyUrl.replace("/"
                        + urlSections[urlSections.length - 1],
                        "/video/" + urlSections[urlSections.length - 1]
                        + "");
                }
            } else if (newURL.indexOf("youtu.be") >= 0) {

                index = newURL.indexOf(".be/");

                embedFriendlyUrl = newURL.slice(index + 4, newURL.length);
                embedFriendlyUrl = "http://www.youtube.com/embed/"
                    + embedFriendlyUrl + youtubeParams;

            } else if (newURL.indexOf("youtube.com") >= 0) { // displaying
                // a youtube
                // video

                embedFriendlyUrl = newURL.replace("/watch?v=", "/embed/")
                    + youtubeParams;

            }
            embedFriendlyUrl = embedFriendlyUrl.replace(/\?/g, '&')
            embedFriendlyUrl = embedFriendlyUrl.replace("&", "?");
            return embedFriendlyUrl;
        } else {
            return newURL;
        }
    }


    static getTime(millisec: number) {
        let time: any = {};
        let seconds: number = Number((millisec / 1000).toFixed(0));
        var minutes: number = Math.floor(Number(seconds) / 60);
        var hours: number = 0;
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            minutes = minutes - (hours * 60);
        }
        seconds = Math.floor(Number(seconds) % 60);
        time.hours = hours;
        time.minutes = minutes;
        time.seconds = seconds;
        return time;
    }

    static getTimeInMilliSeconds(hours: number, min: number, sec: number) {

        hours = hours != null ? hours : 0;
        min = min != null ? min : 0;
        sec = sec != null ? sec : 0;

        return (hours * 60 * 60 * 1000) + (min * 60 * 1000) + (sec * 1000)
    }

    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static youTubeGetID(url) {
        var ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
    }

}