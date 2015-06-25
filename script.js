window.addEventListener('load', function (e) {
    var clockContainer = document.getElementById('clock'),
        showTime = true,
        timeMode,
        dateMode;

    function Clock() {
        var timeAndDate = new Date();

        this.time = [timeAndDate.getHours(), timeAndDate.getMinutes(), timeAndDate.getSeconds()];
        this.date = [timeAndDate.getFullYear(), timeAndDate.getMonth() + 1, timeAndDate.getDate()];
        this.timeToString = function () {
            var timeWithLeadingZeros = [];

            this.time.forEach(function (elem, index) {
                if (elem.toString().length === 1) {
                    timeWithLeadingZeros.push('0' + elem);
                } else {
                    timeWithLeadingZeros.push('' + elem);
                }
            });
            return timeWithLeadingZeros.join(':');
        };
        this.dateToString = function () {
            var dateWithLeadingZeros = [];

            this.date.forEach(function (elem, index) {
                if (elem.toString().length === 1) {
                    dateWithLeadingZeros.push('0' + elem);
                } else {
                    dateWithLeadingZeros.push('' + elem);
                }
            });
            return dateWithLeadingZeros.join(':');
        };

        return this;
    }

    timeMode = setInterval(function () {
        var clock = new Clock();
        clockContainer.innerHTML = clock.timeToString();
    }, 1000);

    document.addEventListener('mousedown', function (e) {
        var clockOffsetX = e.offsetX,
            clockOffsetY = e.offsetY,
            moveBlock;

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
            clearInterval(timeMode);
            if (showTime) {
                dateMode = setInterval(function () {
                    var clock = new Clock();
                    clockContainer.innerHTML = clock.dateToString();
                }, 1000);

                showTime = false;
            } else {
                clearInterval(dateMode);

                timeMode = setInterval(function () {
                    var clock = new Clock();
                    clockContainer.innerHTML = clock.timeToString();
                }, 1000);

                showTime = true;
            }
        }

    }, false);

}, false);
