function Clock() {
    var clockContainer = document.createElement('div'),
        formatMode = 'time',
        privateMethods,
        clockID;

    clockContainer.id = 'clock';
    document.body.appendChild(clockContainer);

    privateMethods = {
        time: getTime,
        date: getDate
    };

    this.init = function () {
        clockID = setInterval(render, 1000);
    };

    this.destroy = function () {
        clearInterval(clockID);
        document.body.removeChild(clockContainer);
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

    return this;
}

function dragAndDrop(selector) {
    var element = document.querySelector(selector);

    element.style.position = 'absolute';

    element.addEventListener('mousedown', function (e) {
        var clockOffsetX = e.offsetX,
            clockOffsetY = e.offsetY,
            moveElement;

        moveElement = function (e) {
            element.style.top = e.clientY - clockOffsetY + 'px';
            element.style.left = e.clientX - clockOffsetX + 'px';
        };

        document.addEventListener('mousemove', moveElement, false);
        document.addEventListener('mouseup', function (e) {
            document.removeEventListener('mousemove', moveElement, false);
        }, false)

    }, false);

}
