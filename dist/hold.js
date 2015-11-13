'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (global, factory) {
   if (typeof define === "function" && define.amd) {
      define('@most/hold', ['exports', 'most/lib/source/MulticastSource'], factory);
   } else if (typeof exports !== "undefined") {
      factory(exports, require('most/lib/source/MulticastSource'));
   } else {
      var mod = {
         exports: {}
      };
      factory(mod.exports, global.MulticastSource);
      global.mostHold = mod.exports;
   }
})(this, function (exports, _MulticastSource2) {
   Object.defineProperty(exports, "__esModule", {
      value: true
   });

   var _MulticastSource3 = _interopRequireDefault(_MulticastSource2);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var _createClass = (function () {
      function defineProperties(target, props) {
         for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
         }
      }

      return function (Constructor, protoProps, staticProps) {
         if (protoProps) defineProperties(Constructor.prototype, protoProps);
         if (staticProps) defineProperties(Constructor, staticProps);
         return Constructor;
      };
   })();

   function _possibleConstructorReturn(self, call) {
      if (!self) {
         throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
   }

   var _get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
         var parent = Object.getPrototypeOf(object);

         if (parent === null) {
            return undefined;
         } else {
            return get(parent, property, receiver);
         }
      } else if ("value" in desc) {
         return desc.value;
      } else {
         var getter = desc.get;

         if (getter === undefined) {
            return undefined;
         }

         return getter.call(receiver);
      }
   };

   function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
         throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
         constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
         }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
   }

   var hold = function hold(stream) {
      return new stream.constructor(new Hold(stream.source));
   };

   var Hold = (function (_MulticastSource) {
      _inherits(Hold, _MulticastSource);

      function Hold(source) {
         _classCallCheck(this, Hold);

         var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hold).call(this, source));

         _this.time = -Infinity;
         _this.value = void 0;
         _this.held = false;
         return _this;
      }

      _createClass(Hold, [{
         key: 'add',
         value: function add(sink) {
            _get(Object.getPrototypeOf(Hold.prototype), 'add', this).call(this, sink);

            if (this.held) {
               sink.event(this.time, this.value);
            }

            return len;
         }
      }, {
         key: 'event',
         value: function event(t, x) {
            if (t >= this.time) {
               this.time = t;
               this.value = x;
               this.held = true;
            }

            _get(Object.getPrototypeOf(Hold.prototype), 'event', this).call(this, t, x);
         }
      }]);

      return Hold;
   })(_MulticastSource3.default);

   exports.default = hold;
});