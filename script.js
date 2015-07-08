window.addEventListener('load', function (e) {
    var clock;

    function Clock() {
        var clockContainer = document.createElement('div'),
            formatMode = 'time',
            privateMethods;

        clockContainer.id = 'clock';
        document.body.appendChild(clockContainer);

        privateMethods = {
            time: getTime,
            date: getDate
        };

        this.init = function () {
            setInterval(function () {
                render();
            }, 1000);
        };

        function render() {
            clockContainer.innerHTML = format(privateMethods[formatMode]());
        }

        function getTime() {
            var currentTime = new Date();
            return [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];
        }

        function getDate() {
            var currentDate = new Date();
            return [currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()];
        }

        function addLeadingZero(number) {
            return (number < 10) ? '0' + number : number;
        }

        function format(arr) {
            return arr.map(addLeadingZero).join(':');
        }

        clockContainer.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            if (formatMode === 'time') {
                clockContainer.innerHTML = format(getDate());
                formatMode = 'date';
            } else {
                clockContainer.innerHTML = format(getTime());
                formatMode = 'time';
            }
            //return formatMode = (formatMode === 'time') ? 'date' : 'time';
        }, false);

        clockContainer.addEventListener('mousedown', function (e) {
            var clockOffsetX = e.offsetX,
                clockOffsetY = e.offsetY,
                moveClock;

            moveClock = function (e) {
                clockContainer.style.top = e.clientY - clockOffsetY + 'px';
                clockContainer.style.left = e.clientX - clockOffsetX + 'px';
            };

            document.addEventListener('mousemove', moveClock, false);
            document.addEventListener('mouseup', function (e) {
                document.removeEventListener('mousemove', moveClock, false);
            }, false)

        }, false);

        return this;
    }

    clock = new Clock();
    clock.init();

}, false);
