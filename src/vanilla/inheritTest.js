var subClass = (function subClass() {
    var F = function() {};

    var subClass = function( obj ) {
        var parent = this === window ? Function : this;


        var child = function() {
            var _parent = child.parent;

            if( _parent && _parent !== Function ) {
                _parent.apply( this, arguments )
            }

            if( child.prototype.ctor ) {
                child.prototype.ctor.apply( this, arguments );
            }
        };

        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.parent = parent;
        child.subClass = arguments.callee;

        for( var i in obj ) {
            if( obj.hasOwnProperty(i)) {
                child.prototype[ i ] = obj[ i ];
            }
        }

        return child;
    };

    return subClass;
})();

var person_obj = {
    ctor: function() {
        console.log( "person init" );
    },

    getName: function() {
        return this._name;
    },
    setName: function( name ) {
        this._name = name;
    }
};

var student_obj = {
    ctor: function() {
        console.log( "student init" );
    },

    getName: function() {
        return "Student Name: " + this._name;
    }
};

var highStudent_obj = {
    ctor: function() {
        console.log( "high init");
    },

    getName: function() {
        return "High Name: " + this._name;
    }
}

var Person = subClass( person_obj ); // Person 클래스 정의
var person = new Person();
person.setName("zzoon");
console.log( person.getName() );

var Student = Person.subClass(student_obj);
var student = new Student();
student.setName("iamjoo");
console.log( student.getName() );

var High = Student.subClass( highStudent_obj );
var high = new High();
high.setName("ss");
console.log( high.getName() );

// console.log( Person.toString() );