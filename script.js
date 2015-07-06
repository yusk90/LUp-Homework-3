window.addEventListener('load', function (e) {
    var clockContainer = document.getElementById('clock'),
        clock = new Clock(),
        showTime = true,
        timeID,
        dateID;

    function Clock() {
        var currentTimeAndDate = new Date(),
            clockID;

        clockID = setInterval(function () {
            currentTimeAndDate = new Date();
        }, 1000);

        this.getTime = function () {
            var time,
                hours,
                minutes,
                seconds;

            hours = currentTimeAndDate.getHours();
            minutes = currentTimeAndDate.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            seconds = currentTimeAndDate.getSeconds();
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            time = hours + ':' + minutes + ':' + seconds;

            return time;
        };
        this.getDate = function () {
            var date,
                day,
                month,
                year;

            day = currentTimeAndDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            month = currentTimeAndDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            year = currentTimeAndDate.getFullYear();
            date = year + ':' + month + ':' + day;

            return date;
        };

        return this;
    }

    document.addEventListener('mousedown', function (e) {
        var clockOffsetX = e.offsetX,
            clockOffsetY = e.offsetY,
            moveBlock;

        //console.log(clockOffsetX + ' ' + clockOffsetY);
        //console.log(e.clientX + ' ' + e.clientY);

        if (e.target.id === 'clock') {

            moveBlock = function (e) {
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
        if (e.target.id === 'clock') {
            e.preventDefault();
            if (showTime) {
                clearInterval(timeID);
                clockContainer.innerHTML =  clock.getDate();
                dateID = setInterval(function () {
                    clockContainer.innerHTML = clock.getDate();
                }, 1000);
                showTime = false;
            } else {
                clearInterval(dateID);
                clockContainer.innerHTML = clock.getTime();
                timeID = setInterval(function () {
                    clockContainer.innerHTML = clock.getTime();
                }, 1000);
                showTime = true;
            }
        }

    }, false);

    timeID = setInterval(function () {
        clockContainer.innerHTML = clock.getTime();
    }, 1000)

}, false);
