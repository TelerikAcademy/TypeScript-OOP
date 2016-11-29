var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Class factory decorator
function sealed(name) {
    return function (target) {
        console.log("Sealing the constructor of: " + name + " class");
        Object.seal(target);
        Object.seal(target.prototype);
    };
}
// Property decorator
function myPropertyDecorator(target, propertyKey, parameterIndex) {
    console.log(target + " | " + propertyKey + " | " + parameterIndex);
}
// Method decorator
function writable(isWritable) {
    return function (target, propertyKey, descriptor) {
        // console.log(`${target} | ${propertyKey} | ${descriptor}`);
        descriptor.writable = isWritable;
    };
}
var School = (function () {
    function School(name, capacity) {
        this.name = name;
        this.capacity = capacity;
    }
    School.prototype.addToClass = function (student) {
        console.log(student + " is added to the class");
    };
    School.prototype.removeFromClass = function (student) {
        console.log(student + " is removed from the class");
    };
    __decorate([
        writable(true)
    ], School.prototype, "addToClass", null);
    __decorate([
        writable(false)
    ], School.prototype, "removeFromClass", null);
    School = __decorate([
        sealed("University")
    ], School);
    return School;
}());
var school = new School("X", 10);
try {
    school.addToClass = function () { return console.log("new implementation for AddToClass"); };
    school.removeFromClass = function () { return console.log("new implementation for RemoveFromClass"); };
}
catch (err) {
    console.log(err.message);
}
// Uses the new implementation
school.addToClass("New guy");
// Uses the old implementation
school.removeFromClass("That old guy");
/// <reference path="toastr.d.ts" />
function test_basic() {
    var t = [];
    t.push(toastr.info('Are you the 6 fingered man?'));
    t.push(toastr.warning('My name is Inigo Montoya. You Killed my father, prepare to die!'));
    t.push(toastr.success('Have fun storming the castle!', 'Miracle Max Says'));
    t.push(toastr.error('I do not think that word means what you think it means.', 'Inconceivable!'));
    toastr.clear(t[0]); // clear 1
    toastr.clear(); // clear all
    var msg = 'Do you think Rodents of Unusual Size really exist?';
    var title = 'Fireswamp Legends';
    var overrides = { timeOut: 250 };
    toastr.warning(msg, title, overrides);
    toastr.options.onclick = function () { };
}
function test_fromdemo() {
    var i = -1, toastCount = 0, $toastlast, getMessage = function () {
        var msgs = ['My name is Inigo Montoya. You killed my father. Prepare to die!',
            '<div><input class="input-small" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>',
            'Are you the six fingered man?',
            'Inconceivable!',
            'I do not think that means what you think it means.',
            'Have fun storming the castle!'
        ];
        i++;
        if (i === msgs.length) {
            i = 0;
        }
        return msgs[i];
    };
    $('#showtoast').click(function () {
        var shortCutFunction = $("#toastTypeGroup input:radio:checked").val(), msg = $('#message').val(), title = $('#title').val() || '', $fadeIn = $('#fadeIn'), $fadeOut = $('#fadeOut'), $timeOut = $('#timeOut'), $extendedTimeOut = $('#extendedTimeOut'), toastIndex = 123;
        toastr.options = {
            debug: $('#debugInfo').prop('checked'),
            tapToDismiss: $('#tapToDismiss').prop('checked'),
            positionClass: $('#positionGroup input:radio:checked').val() || 'toast-top-right',
            preventDuplicates: true,
            progressBar: true
        };
        if ($fadeIn.val().length) {
            toastr.options.showDuration = +$fadeIn.val();
        }
        if ($fadeOut.val().length) {
            toastr.options.hideDuration = +$fadeOut.val();
        }
        if ($timeOut.val().length) {
            toastr.options.timeOut = +$timeOut.val();
        }
        if ($extendedTimeOut.val().length) {
            toastr.options.extendedTimeOut = +$extendedTimeOut.val();
        }
        var $toast = toastr[shortCutFunction](msg, title);
        if ($toast.find('#okBtn').length) {
            $toast.on('click', '#okBtn', function () {
                alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                $toast.remove();
            });
        }
        if ($toast.find('#surpriseBtn').length) {
            $toast.on('click', '#surpriseBtn', function () {
                alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
            });
        }
    });
    $('#clearlasttoast').click(function () {
        toastr.clear($toastlast);
    });
    $('#cleartoasts').click(function () {
        toastr.clear();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIiwidG9hc3RyL3RvYXN0ci10ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwQkFBMEI7QUFDMUIsZ0JBQWdCLElBQVk7SUFDeEIsTUFBTSxDQUFDLFVBQVUsTUFBZ0I7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBK0IsSUFBSSxXQUFRLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFFRCxxQkFBcUI7QUFDckIsNkJBQTZCLE1BQWMsRUFBRSxXQUFtQixFQUFFLGNBQXNCO0lBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUksTUFBTSxXQUFNLFdBQVcsV0FBTSxjQUFnQixDQUFDLENBQUE7QUFDakUsQ0FBQztBQUVELG1CQUFtQjtBQUNuQixrQkFBa0IsVUFBbUI7SUFDakMsTUFBTSxDQUFDLFVBQVUsTUFBYyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7UUFDaEYsNkRBQTZEO1FBQzdELFVBQVUsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3JDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFHRDtJQUNJLGdCQUFtQixJQUFZLEVBQVMsUUFBZ0I7UUFBckMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7SUFDeEQsQ0FBQztJQUdNLDJCQUFVLEdBQWpCLFVBQWtCLE9BQWU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBSSxPQUFPLDJCQUF3QixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUdNLGdDQUFlLEdBQXRCLFVBQXVCLE9BQWU7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBSSxPQUFPLCtCQUE0QixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQVJE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