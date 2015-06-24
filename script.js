window.addEventListener('load', function (e) {
    var clockContainer = document.getElementById('clock'),
        clockId;

    function addLeadingZero(obj) {
        var propName;

        for (propName in obj) {
            if (obj.hasOwnProperty(propName)) {
                if (obj[propName].toString().length === 1) {
                    obj[propName] = "0" + obj[propName];
                }
            }
        }
        return obj;
    }

    clockId = setInterval(function () {
        var currentTime = new Date(),
            time,
            timeString,
            propName;

        time = {
            hours: currentTime.getHours(),
            minutes: currentTime.getMinutes(),
            seconds: currentTime.getSeconds()
        };

        addLeadingZero(time);

        timeString = time.hours + ":" + time.minutes + ":" + time.seconds;
        return clockContainer.innerHTML = timeString;

    }, 1000);

    document.addEventListener('mousedown', function (e) {
        if (e.target.id === 'clock') {
            var clockOffsetX = e.offsetX,
                clockOffsetY = e.offsetY,
                currentClockPositionX,
                currentClockPositionY,
                moveBlock;

            moveBlock = function (e) {
                currentClockPositionX = parseInt(clockContainer.style.left);
                currentClockPositionY = parseInt(clockContainer.style.top);

                clockContainer.style.top = e.clientY - clockOffsetY + 'px';
                clockContainer.style.left = e.clientX - clockOffsetX + 'px';
            };
            document.addEventListener('mousemove', moveBlock, false);
            document.addEventListener('mouseup', function (e) {
                document.removeEventListener('mousemove', moveBlock, false);
            }, false)
        }
    }, false);

    document.addEventListener('contextmenu', function (e) {
        var currentTime = new Date(),
            date,
            dateString,
            propName;

        date = {
            year: currentTime.getFullYear(),
            month: currentTime.getMonth(),
            day: currentTime.getDay()
        };

        addLeadingZero(date);

        dateString = date.year + ":" + date.month + ":" + date.day;

        if (e.target.id === 'clock') {
            e.preventDefault();
            clearInterval(clockId);
            clockId = null;
            clockContainer.innerHTML = dateString;
        }
    }, false);


    /*document.addEventListener('click', function (e) {
     if (e.target.id === 'clock') {
     e.preventDefault();
     console.log('clicked');
     clockId = setInterval(function () {
     var currentTime = new Date(),
     time,
     timeString,
     propName;

     time = {
     hours: currentTime.getHours(),
     minutes: currentTime.getMinutes(),
     seconds: currentTime.getSeconds()
     };

     addLeadingZero(time);

     timeString = time.hours + ":" + time.minutes + ":" + time.seconds;
     return clockContainer.innerHTML = timeString;

     }, 1000);
     dragged = false;
     }
     }, false)*/

}, false);
