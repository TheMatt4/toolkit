String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

function rand(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

(function($) {
  $.fn.hasScrollBar = function() {
    return this.get(0).scrollHeight > this.height();
  }
})(jQuery);

function bitFloor(number) {
  if (number <= 0) return 0;
  var floor = Math.pow(2, 32);
  while (floor > number) {
    floor /= 2;
  }
  return floor;
}

function shuffle(array, dis) {
  var currentIndex = array.length - dis,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(".currentYear").html((new Date()).getFullYear());

$('body').keydown(function(e) {
  if (e.keyCode == 13) {
    if ($(".inter input").is(":focus")) {
      var index = $(':focus').parent().index();
      if ($(':focus').parent().parent().is(":last-child")) {



        if ($(':focus').parent().is(":last-child") || (subnetting.instances[subnetting.currentInstance].answers == true && $(':focus').parent().next().is(":last-child"))) index = 1;
        else if (subnetting.instances[subnetting.currentInstance].answers == true) index++;
        $(':focus').parent().parent().parent().children().eq(1).children().eq(++index).children().focus();

      } else {

        $(':focus').parent().parent().next().children().eq(index).children().focus();

      }


    } else if ($(".sectionL input").is(":focus")) {
      subnetting.fillAllTrigger();
      if (!inAnim) {
        inAnim = true;
        var theButton = $(".sectionL button");
        theButton.children().children().css("animation", "arrowUp .5s");
        setTimeout(function() {
          theButton.children().children().css("animation", "");
          inAnim = false;
        }, 500);
      }
    }
  }
});

var subnetting = new Vue({
  el: '#subnetting',
  data: {

    baseIPIn: "192.0.2.0",

    prefixIn: "24",
    basePrefixMin: 24,
    basePrefixMax: 24,
    diff: "2",


    subnetCountIn: "4-6",
    instances: [],
    currentInstance: -1,
    currentInstanceLazy: -1,
    subnetCountMin: 0,
    subnetCountMax: 0,


    location: "settings",
    inputDisabled: false,
    help: false,
    fillAll: "",
    specsOpts: {
      firstA: true,
      firstH: false,
      lastH: false,
      lastA: true,
      mask: false,
      prefix: true
    },
    page: "main",
    specsAnimations: true,
    diffInfo: false,
    specsReserve: 1,
    specsReservePosition: {
      left: "0px",
      width: "123.25px"
    },
    specsSeed: "",
    biggerFrame: "1400px",
    exclude: [{
        ip: "0.0.0.0",
        prefix: "/8"
      },
      {
        ip: "127.0.0.0",
        prefix: "/8"
      },
      {
        ip: "169.254.0.0",
        prefix: "/16"
      },
    ],
    //currentInstanceHeightVar: "10px",
    mod1: {
      prefixIn: "26-30",
      prefixMin: "26",
      prefixMax: "30",
      prefix: "",
      address1: "",
      address1Type: "",
      address2: "",
      address2Type: "",
      address2In: "",
      checkColor: "",
      answers: false
    },
    mod2: {
      prefixIn: "26-28",
      prefixMin: "26",
      prefixMax: "28",
      prefix: "",
      address1: "",
      address2: "",
      checkColor: "",
      in: "",
      inPosition: {
        left: "",
        width: ""
      },
      selected: false,
      result: "0",
      oneSubnet: false
    }
  },
  computed: {
    currentInstanceName: function() {
      if (this.instances.length != 0) {
        return this.instances[this.currentInstance].name;
      }
    },
    currentInstanceHeight: function() {
      var top = 0;
      if (this.instances.length != 0) {
        if (this.instances[this.currentInstance].update == true) {
          //top += 25;

        }
      }

      top += parseInt($(".main .instance").eq(this.currentInstanceLazy).outerHeight());


      return top;



    },
    reserve: function() {
      var reserve;
      switch (this.specsReserve) {
        case 1:
          reserve = 0;
          break;
        case 2:
          reserve = 10;
          break;
        case 3:
          reserve = 25;
          break;
        case 4:
          reserve = 50;
          break;
        default:
          reserve = 0
          break;
      }
      return reserve;
    },
    reserveOut: function() {
      var reserve;
      switch (this.specsReserve) {
        case 1:
          reserve = 1;
          break;
        case 2:
          reserve = 100 / 110;
          break;
        case 3:
          reserve = 100 / 125;
          break;
        case 4:
          reserve = 100 / 150;
          break;
        default:
          reserve = 1
          break;
      }
      return reserve;
    },
    specsReserveSelected: function() {
      var left = 0;
      var width;
      for (var i = 1; i < this.specsReserve; i++) {
        left += parseInt($(".specsReserve label").eq(i - 1).outerWidth());
      }
      width = $(".specsReserve label").eq(this.specsReserve - 1).outerWidth();

      this.specsReservePosition.left = left + "px";
      this.specsReservePosition.width = width + "px";

      return left;
    },
    mod2InSelected: function() {

      var left = 0;
      var width;
      for (var i = 1; i < this.mod2.in; i++) {
        left += parseInt($(".mod2In label").eq(i - 1).outerWidth());
      }
      width = $(".mod2In label").eq(this.mod2.in - 1).outerWidth();

      this.mod2.inPosition.left = left + "px";
      this.mod2.inPosition.width = width + "px";

      return left;
    },
    /*specsMaskSelected: function() {

      var left = 0;
      var width;
      var val;
      if(!this.specsMask) val = 1;
      else val = 2;
      for (var i = 1; i < val; i++) {
        left += parseInt($(".specsMask label").eq(i-1).outerWidth());
      }
      width = $(".specsMask label").eq(val-1).outerWidth();

      $(".specsMask .sliderBackg").css("left",left+"px");
      $(".specsMask .sliderBackg").css("width",width+"px");
    },*/
    thediff: function() {
      var result = "";



      if (this.baseIPIn == "192.0.2.0" && this.prefixIn == "24" && this.subnetCountIn == "2-3") result = "1";
      else if (this.baseIPIn == "192.0.2.0" && this.prefixIn == "24" && this.subnetCountIn == "4-6") result = "2";
      else if (this.baseIPIn == "192.0.2.?" && this.prefixIn == "24-26" && this.subnetCountIn == "4-8") result = "3";
      else if (this.baseIPIn == "" && this.prefixIn == "22-26" && this.subnetCountIn == "4-8") result = "4";
      this.diff = result;
      return result;

    },
    countValid: function() {
      var valid = true;
      var count = this.subnetCountIn;
      if (count.toString().split(' ').length > 1) valid = false;
      if (count.toString().length <= 2) {
        if (!isNumeric(count) || parseInt(count) < 2 || parseInt(count) > 14 || count % 1 != 0) valid = false;
        if (valid) {
          this.subnetCountMin = count;
          this.subnetCountMax = count;
        }
      } else {
        var count1 = count.split("-")[0];
        var count2 = count.split("-")[1];
        if (count.split("-").length > 2) valid = false;
        if (!isNumeric(count1) || parseInt(count1) < 2 || parseInt(count1) > 14 || count1 % 1 != 0) valid = false;
        if (!isNumeric(count2) || parseInt(count2) < 2 || parseInt(count2) > 14 || count2 % 1 != 0) valid = false;
        if (parseInt(count1) >= parseInt(count2)) valid = false;

        if (valid) {
          this.subnetCountMin = count1;
          this.subnetCountMax = count2;
        }
      }

      return valid;
    },
    ipValid: function() {
      var valid = true;
      var ip = this.baseIPIn;

      if (ip.toString().split(' ').length > 1) valid = false;

      if (ip == "") {
        ip = "?.?.?.?";
      }
      var octets = ip.split(".");
      if (octets.length != 4) {
        valid = false;
      } else {
        octets.forEach(function(octet) {
          if (octet != "?") {
            if (!isNumeric(octet) || parseInt(octet) < 0 || parseInt(octet) > 255) valid = false;
          }



        });
      }
      return valid;
    },
    prefixValid: function() {
      var valid = true;
      var prefix = this.prefixIn;

      if (prefix.toString().split(' ').length > 1) valid = false;

      if (prefix.toString().length <= 2) {
        if (!isNumeric(prefix) || parseInt(prefix) < 8 || parseInt(prefix) > 28 || prefix % 1 != 0) valid = false;

        if (valid) {
          this.basePrefixMin = prefix;
          this.basePrefixMax = prefix;
        }
      } else {
        var prefix1 = prefix.split("-")[0];
        var prefix2 = prefix.split("-")[1];
        if (prefix.split(' ').length > 1) valid = false;
        if (prefix.split("-").length > 2) valid = false;
        if (!isNumeric(prefix1) || parseInt(prefix1) < 8 || parseInt(prefix1) > 28 || prefix1 % 1 != 0) valid = false;
        if (!isNumeric(prefix2) || parseInt(prefix2) < 8 || parseInt(prefix2) > 28 || prefix2 % 1 != 0) valid = false;
        if (parseInt(prefix1) >= parseInt(prefix2)) valid = false;

        if (valid) {
          this.basePrefixMin = prefix1;
          this.basePrefixMax = prefix2;
        }
      }

      return valid;
    },
    comboValid: function() {
      var ip = this.baseIPInBit;

      var prefix = this.basePrefixMinBit;
      var valid = true;

      if (ip.length == 32 && prefix.length == 32) {
        for (var i = 0; i < 32; i++) {
          if (prefix.charAt(i) == 0 && ip.charAt(i) == 1) {
            valid = false;
            break;
          }
        }
      } else {
        valid = false;
      }

      return valid;
    },
    prefixValidMod1: function() {
      var valid = true;
      var prefix = this.mod1.prefixIn;

      if (prefix.toString().split(' ').length > 1) valid = false;

      if (prefix.toString().length <= 2) {
        if (!isNumeric(prefix) || parseInt(prefix) < 8 || parseInt(prefix) > 30 || prefix % 1 != 0) valid = false;

        if (valid) {
          this.mod1.prefixMin = prefix;
          this.mod1.prefixMax = prefix;
        }
      } else {
        var prefix1 = prefix.split("-")[0];
        var prefix2 = prefix.split("-")[1];
        if (prefix.split(' ').length > 1) valid = false;
        if (prefix.split("-").length > 2) valid = false;
        if (!isNumeric(prefix1) || parseInt(prefix1) < 8 || parseInt(prefix1) > 30 || prefix1 % 1 != 0) valid = false;
        if (!isNumeric(prefix2) || parseInt(prefix2) < 8 || parseInt(prefix2) > 30 || prefix2 % 1 != 0) valid = false;
        if (parseInt(prefix1) >= parseInt(prefix2)) valid = false;

        if (valid) {
          this.mod1.prefixMin = prefix1;
          this.mod1.prefixMax = prefix2;
        }
      }

      return valid;
    },
    prefixValidMod2: function() {
      var valid = true;
      var prefix = this.mod2.prefixIn;

      if (prefix.toString().split(' ').length > 1) valid = false;

      if (prefix.toString().length <= 2) {
        if (!isNumeric(prefix) || parseInt(prefix) < 8 || parseInt(prefix) > 30 || prefix % 1 != 0) valid = false;

        if (valid) {
          this.mod2.prefixMin = prefix;
          this.mod2.prefixMax = prefix;
        }
      } else {
        var prefix1 = prefix.split("-")[0];
        var prefix2 = prefix.split("-")[1];
        if (prefix.split(' ').length > 1) valid = false;
        if (prefix.split("-").length > 2) valid = false;
        if (!isNumeric(prefix1) || parseInt(prefix1) < 8 || parseInt(prefix1) > 30 || prefix1 % 1 != 0) valid = false;
        if (!isNumeric(prefix2) || parseInt(prefix2) < 8 || parseInt(prefix2) > 30 || prefix2 % 1 != 0) valid = false;
        if (parseInt(prefix1) >= parseInt(prefix2)) valid = false;

        if (valid) {
          this.mod2.prefixMin = prefix1;
          this.mod2.prefixMax = prefix2;
        }
      }

      return valid;
    },
    baseIPColor: function() {
      if (!this.ipValid) return "red";
      else if (!this.comboValid) return "#f40";
      else return "";
    },
    basePrefixColor: function() {
      if (!this.prefixValid) return "red";
      else if (!this.comboValid) return "#f40";
      else return "";
    },
    baseCountColor: function() {
      if (!this.countValid) return "red";
      else return "";
    },
    mod1PrefixColor: function() {
      if (!this.prefixValidMod1) return "red";
      else return "";
    },
    mod2PrefixColor: function() {
      if (!this.prefixValidMod2) return "red";
      else return "";
    },

    basePrefixMinBit: function() {
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < this.basePrefixMin) str += "1";
        else str += "0";
      }
      return str;
    },
    basePrefixMaxBit: function() {
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < this.basePrefixMax) str += "1";
        else str += "0";
      }
      return str;
    },

    baseIPInBit: function() {
      var str = "";
      var i = 0;
      if (this.baseIPIn == "") {
        return "00000000000000000000000000000000";
      }
      var octets = this.baseIPIn.split(".");
      var that = this;
      octets.forEach(function(octet) {
        if (octet == "?") octet = 0;
        if (that.dec2bin(parseInt(octet)).length == 8) {
          str += that.dec2bin(parseInt(octet));
        } else {
          str += "00000000";
        }

      });
      return str;

    },

  },
  methods: {
    mod2Actuate: function() {
      if (!this.mod2.selected) {
        this.mod2.selected = true;
        this.$nextTick(() => {
          this.mod2.aftershock = true;
        });
      }

    },
    setPageAddit: function() {

      if (this.page != "addit") this.page = "addit";
      else this.page = "main";
    },
    setPageMods: function() {
      if (this.page != "mods") this.page = "mods";
      else this.page = "main";
    },
    saveSettings: function() {
      var data = {
        subnetCountIn: this.subnetCountIn,
        baseIPIn: this.baseIPIn,
        prefixIn: this.prefixIn,
        specsOpts: this.specsOpts,
        specsReserve: this.specsReserve,
        specsSeed: this.specsSeed,
        specsAnimations: this.specsAnimations
      };
      var json = JSON.stringify(data);
      setCookie("subnettingSettings", json, 1000);
    },
    prevInstance: function() {
      $(".main .instance").eq(subnetting.currentInstance).addClass("offRight");
      this.currentInstance--;
      this.currentInstanceLazy--;
      if (subnetting.specsAnimations) {
        setTimeout(function() {
          $(".main .instance").eq(subnetting.currentInstance).removeClass("offLeft");
        }, 300);
      } else {
        $(".main .instance").eq(subnetting.currentInstance).removeClass("offLeft");
      }
    },
    nextInstance: function() {
      $(".main .instance").eq(subnetting.currentInstance).addClass("offLeft");
      this.currentInstance++;
      this.currentInstanceLazy++;
      if (subnetting.specsAnimations) {
        setTimeout(function() {
          $(".main .instance").eq(subnetting.currentInstance).removeClass("offRight");
        }, 300);
      } else {
        $(".main .instance").eq(subnetting.currentInstance).removeClass("offRight");
      }

    },
    hostsMax: function(instance) {
      return Math.pow(2, 32 - parseInt(this.instances[instance].basePrefix));
    },
    hostsMaxBit: function(instance) {
      return 32 - parseInt(this.instances[instance].basePrefix);
    },
    basePrefixBit: function(instance) {
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < this.instances[instance].basePrefix) str += "1";
        else str += "0";
      }
      return str;
    },
    baseIPBit: function(instance) {
      var str = "";
      var i = 0;
      var octets = this.instances[instance].baseIP.split(".");
      var that = this;
      octets.forEach(function(octet) {
        if (octet == "?") octet = 0;
        if (that.dec2bin(parseInt(octet)).length == 8) {
          str += that.dec2bin(parseInt(octet));
        } else {
          str += "00000000";
        }

      });
      return str;

    },
    lastIP: function(instance) {
      return this.bitToA(this.bitDeduct(this.bitAdd(this.baseIPBit(instance), this.prefixToBit(this.instances[instance].basePrefix)), "00000000000000000000000000000001"));
    },
    basePrefixShow: function(instance) {
      return this.basePrefixBit(instance).match(/.{1,8}/g);
    },
    baseIPShow: function(instance) {
      return this.baseIPBit(instance).match(/.{1,8}/g);
    },
    downTheIP: function() {
      var ip = this.baseIPInBit;
      var prefix = this.basePrefixMinBit;

      var i = 0;
      while (prefix[i] == 1 && i < 32) {
        i++;
      }
      var zeros = "";
      j = i;
      while (j < 32) {
        zeros += "0";
        j++;
      }
      this.baseIPIn = this.bitToA(ip.substr(0, i) + zeros);
    },
    updateSeed: function(e) {
      var val = e.target.value;
      if (val == "") {
        Math.seedrandom();
      } else {
        Math.seedrandom(val);
      }
      console.log("seed nastaven na " + val);
    },
    prefixToMask: function(prefix) {
      var bit = "";
      for (var i = 0; i < 32; i++) {
        if (i < prefix) bit += "1";
        else bit += "0";
      }
      var a = "";
      a += this.bin2dec(bit.slice(0, 8)).toString() + ".";
      a += this.bin2dec(bit.slice(8, 16)).toString() + ".";
      a += this.bin2dec(bit.slice(16, 24)).toString() + ".";
      a += this.bin2dec(bit.slice(24, 32)).toString();

      return a;
    },
    fillAllTrigger: function() {
      for (var i = 0; i < this.instances[this.currentInstance].subnets.length; i++) {
        this.instances[this.currentInstance].subnets[i].inFirstA = this.fillAll;
        this.instances[this.currentInstance].subnets[i].inLastA = this.fillAll;
        this.instances[this.currentInstance].subnets[i].inFirstH = this.fillAll;
        this.instances[this.currentInstance].subnets[i].inLastH = this.fillAll;
      }
    },
    changeSettings: function() {
      this.inputDisabled = false;
      this.instances = [];
      this.currentInstance = -1;
      this.currentInstanceLazy = -1;
    },
    swapSettings: function() {
      if (this.inputDisabled) {
        if (this.location == "settings") this.location = "main";
        else if (this.location == "main") this.location = "settings";
      } else if (this.location.substring(0, 3) == "mod") {
        this.location = "settings";
      }
    },
    swapSubnettingHelp: function() {
      if (!this.help) $(".helpBox").hide().slideDown(300);
      else $(".helpBox").slideUp(300);
      this.help = !this.help;
    },
    convertToBit: function(n) {
      var bit = 0;
      while (n > 1) {
        n /= 2;
        bit++;
      }
      return bit;
    },
    prefixToBit: function(prefix) {
      var str = "00000000000000000000000000000000";
      return str.replaceAt(prefix - 1, "1");
    },
    bitToA: function(bit) {
      var a = "";
      a += this.bin2dec(bit.slice(0, 8)).toString() + ".";
      a += this.bin2dec(bit.slice(8, 16)).toString() + ".";
      a += this.bin2dec(bit.slice(16, 24)).toString() + ".";
      a += this.bin2dec(bit.slice(24, 32)).toString();
      return a;
    },
    bitDeduct: function(a, b) {
      var result = "";
      var leftover = 0;
      for (var i = 31; i >= 0; i--) {
        var sum = parseInt(a[i]) - parseInt(b[i]) - leftover;

        if (sum == -1) {
          sum = 1;
          leftover = 1;
        } else if (sum == -2) {
          sum = 0;
          leftover = 1;
        } else {
          leftover = 0;
        }

        result = sum.toString() + result;
      }
      return result;
    },
    bitAdd: function(a, b) {
      var result = "";
      var leftover = 0;
      for (var i = 31; i >= 0; i--) {
        var sum = parseInt(a[i]) + parseInt(b[i]) + leftover;
        leftover = 0;
        if (sum >= 2) {
          leftover++;
          if (sum == 2) {
            result = "0" + result;
          } else if (sum == 3) {
            result = "1" + result;
          } else {
            console.error("error");
            result = "error";
          }
        } else {
          result = sum.toString() + result;
        }
      }
      return result;
    },
    dec2bin: function(dec) {
      var str = "";
      var zeros = 8 - dec.toString(2).length;

      while (zeros-- > 0) {
        str += "0";
      }
      str += dec.toString(2);
      return str;
    },
    dec2bin32: function(dec) {
      var str = "";
      var zeros = 32 - dec.toString(2).length;

      while (zeros-- > 0) {
        str += "0";
      }
      str += dec.toString(2);
      return str;
    },
    bin2dec: function(bin) {
      return parseInt(bin, 2);
    },
    randInBitRange: function(range) {
      if (range == 2) return 2;
      var reserve = this.reserveOut;
      if (reserve == 1) {
        return rand(Math.pow(2, range - 1) - 1, Math.pow(2, range) - 2);
      } else {
        var min = Math.ceil((Math.pow(2, range - 1) - 1) * reserve);
        var max = Math.floor((Math.pow(2, range) - 2) * reserve);
        return rand(min, max);
      }
    },
    bitFloor: function(number) {
      var a = 0;
      var b = this.hostsMax(this.currentInstance);
      while (number <= b) {
        b = b / 2;
        a = a + 1;
        if (a > 32) return false;
      }
      return (a);
    },
    countHosts: function() {
      var hosts = 0;
      for (var i = 0; i < this.instances[this.currentInstance].subnetsCount.length; i++) {
        hosts += parseInt(this.instances[this.currentInstance].subnetsCount[i]) * Math.pow(2, i + 1);
      }
      return hosts;
    },
    addToSubnetsCount: function(position, change) {
      this.instances[this.currentInstance].subnetsCount = this.instances[this.currentInstance].subnetsCount.replaceAt(position - 1, (parseInt(this.instances[this.currentInstance].subnetsCount.charAt(position - 1)) + change).toString());
      if (parseInt(this.instances[this.currentInstance].subnetsCount.charAt(position - 1)) >= 2) {
        this.addToSubnetsCount(position, -2);
        this.addToSubnetsCount(position + 1, 1);
      }
    },
    toIP: function(ip, prefix) {
      if (ip == "") ip = "?.?.?.?";
      var custom = true;
      if (ip.substr(0, 2) == "?.?") {
        custom = false;
      }
      var ipValid = true;
      var str = "";
      var i = 0;
      while (i < 32) {
        if (i++ < prefix) str += "1";
        else str += "0";
      }
      var basePrefixBit = str;

      var newIPBit = "";
      var newIP = "";
      var octets = ip.split(".");
      var i = 0;
      var first = true;
      if (octets.length != 4) {
        throw "Invalid ip";
      } else {
        var r = 0;
        do {
          ipValid = true;
          newIPBit = "";
          newIP = "";
          first = true;
          i = 0;
          octets.forEach(function(octet) {
            if (octet == "?") {
              var j = 0;
              var octetBit = "";
              if (first) {
                if (prefix >= 24) {
                  octetBit = "110"
                  j = 3;
                } else if (prefix >= 16) {
                  octetBit = "10"
                  j = 2;
                } else if (prefix >= 8) {
                  octetBit = "0"
                  j = 1;
                }
              }

              for (; j < 8; j++) {

                if (basePrefixBit.charAt(8 * i + j) == 1) octetBit += rand(0, 1);
                else octetBit += "0";
              }
              newIP += subnetting.bin2dec(octetBit);
              newIPBit += octetBit;
            } else {
              newIP += octet;
              newIPBit += subnetting.dec2bin(octet);
            }
            first = false;
            i++;
            if (i < 4) newIP += ".";
          });
          //testing for excluded ranges
          if (!custom) {


            for (var i = 0; i < this.exclude.length; i++) {
              var eIpBit = "";
              var eOctets = this.exclude[i].ip.split(".");
              var that = this;
              eOctets.forEach(function(octet) {
                if (that.dec2bin(parseInt(octet)).length == 8) {
                  eIpBit += that.dec2bin(parseInt(octet));
                } else {
                  eIpBit += "00000000";
                }
              });
              var ePrefix = this.exclude[i].prefix.substr(1);

              if (newIPBit.substr(0, ePrefix) == eIpBit.substr(0, ePrefix)) {
                ipValid = false;

                console.error("Ip within excluded range. Regenerating.");
                break;

              }
            }
            if (r > 100) throw "fail";
            r++;
          }
        } while (!ipValid);
      }
      return newIP;
    },
    toRandAddress: function(baseBit, prefix) {
      for (var i = prefix; i < 32; i++) {

        baseBit = baseBit.replaceAt(i, rand(0, 1).toString());
      }

      return baseBit;
    },
    checkMod1: function() {
      var rightColor = "green";
      var notRightColor = "#f33";
      if (this.mod1.address2 == this.mod1.address2In) {
        this.mod1.checkColor = rightColor;
      } else {
        this.mod1.checkColor = notRightColor;
      }

    },
    checkMod2: function() {
      var input;
      switch (this.mod2.in) {
        case 1:
          input = true;
          break;
        case 2:
          input = false;
          break;
      }
      if (this.mod2.oneSubnet == input) {
        this.mod2.result = "1";
      } else {
        this.mod2.result = "-1";
      }
    },
    fillAndFocusMod1: function(index) {
      this.mod1.address2In = this.mod1.octets.slice(index, 4).reverse().join('.') + (index != 0 ? '.' : '');
      $(".mod1 input").focus();
    },
    showResultsMod1: function() {
      this.mod1.answers = true;
    },
    generateMod1: function() {
      this.location = "mod1";
      this.mod1.answers = false;
      this.mod1.checkColor = "";
      this.mod1.address2In = "";
      this.mod1.prefix = rand(parseInt(this.mod1.prefixMin), parseInt(this.mod1.prefixMax));

      var ip = this.toIP("", this.mod1.prefix);
      var a;
      var b;
      do {
        a = rand(1, 4);
        b = rand(1, 4);
      } while (a == b);

      var ipBit = "";
      var i = 0;
      var octets = ip.split(".");
      var that = this;
      octets.forEach(function(octet) {
        if (octet == "?") octet = 0;
        if (that.dec2bin(parseInt(octet)).length == 8) {
          ipBit += that.dec2bin(parseInt(octet));
        } else {
          ipBit += "00000000";
        }
      });
      switch (a) {
        case 1:
          this.mod1.address1Type = "Adresa";
          this.mod1.address1 = ip;
          break;
        case 2:
          this.mod1.address1Type = "První host";
          this.mod1.address1 = this.bitToA(this.bitAdd(ipBit, "00000000000000000000000000000001"));
          break;
        case 3:
          this.mod1.address1Type = "Poslední host";
          this.mod1.address1 = this.bitToA(this.bitDeduct(this.bitAdd(ipBit, this.prefixToBit(this.mod1.prefix)), "00000000000000000000000000000010"));
          break;
        case 4:
          this.mod1.address1Type = "Broadcast";
          this.mod1.address1 = this.bitToA(this.bitDeduct(this.bitAdd(ipBit, this.prefixToBit(this.mod1.prefix)), "00000000000000000000000000000001"));
          break;
      }
      this.mod1.octets = this.mod1.address1.split(".").reverse();
      switch (b) {
        case 1:
          this.mod1.address2Type = "podsítě";
          this.mod1.address2 = ip;
          break;
        case 2:
          this.mod1.address2Type = "prvního hosta";
          this.mod1.address2 = this.bitToA(this.bitAdd(ipBit, "00000000000000000000000000000001"));
          break;
        case 3:
          this.mod1.address2Type = "posledního hosta";
          this.mod1.address2 = this.bitToA(this.bitDeduct(this.bitAdd(ipBit, this.prefixToBit(this.mod1.prefix)), "00000000000000000000000000000010"));
          break;
        case 4:
          this.mod1.address2Type = "broadcastu";
          this.mod1.address2 = this.bitToA(this.bitDeduct(this.bitAdd(ipBit, this.prefixToBit(this.mod1.prefix)), "00000000000000000000000000000001"));
          break;
      }

    },
    generateMod2: function() {
      this.mod2.selected = false;
      this.mod2.result = "0";
      this.$nextTick(() => {
        this.mod2.aftershock = false;
      });

      this.location = "mod2";
      this.mod2.checkColor = "";
      this.mod2.prefix = rand(parseInt(this.mod2.prefixMin), parseInt(this.mod2.prefixMax));

      var ip = this.toIP("", this.mod2.prefix);

      var ipBit = "";
      var i = 0;
      var octets = ip.split(".");
      var that = this;
      octets.forEach(function(octet) {
        if (octet == "?") octet = 0;
        if (that.dec2bin(parseInt(octet)).length == 8) {
          ipBit += that.dec2bin(parseInt(octet));
        } else {
          ipBit += "00000000";
        }
      });

      this.mod2.oneSubnet = !!rand(0, 1);

      if (this.mod2.oneSubnet) {
        do {
          this.mod2.address1 = this.bitToA(this.toRandAddress(ipBit, this.mod2.prefix));
          this.mod2.address2 = this.bitToA(this.toRandAddress(ipBit, this.mod2.prefix));
        } while (this.mod2.address1 == this.mod2.address2);
      } else {
        //if(rand(0,1) == 1) {

        if (rand(0, 1) == 1) {

          this.mod2.address1 = this.bitToA(this.toRandAddress(ipBit, this.mod2.prefix));
          var rng = this.dec2bin32(Math.ceil(Math.sqrt(rand(1, Math.pow(Math.pow(32 - this.mod2.prefix, 2), 2)))))

          this.mod2.address2 = this.bitToA(this.bitDeduct(ipBit, rng));
        } else {

          this.mod2.address1 = this.bitToA(this.toRandAddress(ipBit, this.mod2.prefix));
          this.mod2.address2 = this.bitToA(this.bitAdd(this.bitAdd(ipBit, this.prefixToBit(this.mod2.prefix)), this.dec2bin32(Math.ceil(Math.sqrt(rand(0, Math.pow(Math.pow(32 - this.mod2.prefix, 2), 2)))))));
        }
        /*}
        else {
          if(rand(0,1) == 1) {
            this.mod2.address2 = this.bitToA(this.toRandAddress(ipBit, this.mod2.prefix));
            this.mod2.address1 = this.bitToA(this.bitDeduct(ipBit, this.dec2bin32(Math.ceil(Math.sqrt(rand(0,Math.pow(Math.pow(32-this.mod2.prefix,2),2)))))));
          }
          else {
            this.mod2.address2 = this.bitToA(this.toRandAddress(ipBit, this.mod2.prefix));
            this.mod2.address1 = this.bitToA(this.bitAdd(this.bitAdd(ipBit, this.prefixToBit(this.mod2.prefix)), this.dec2bin32(Math.ceil(Math.sqrt(rand(0,Math.pow(Math.pow(32-this.mod2.prefix,2),2)))))));
          }
        }*/
      }


    },
    generateNew: function() {
      this.location = "main";
      this.inputDisabled = true;
      this.generate();
      $(".buttonsBox").css({
        "transition": "0s",
        "visibility": "hidden"
      });
      setTimeout(function() {
        $(".buttonsBox").css({
          "transition": "",
          "visibility": ""
        });
      }, 100);
    },
    generate: function() {

      if (subnetting.instances.length != 0 && subnetting.specsAnimations) {
        $(".main .instance").eq(subnetting.currentInstance).addClass("offLeft");
      } else {
        var previousInstance = subnetting.currentInstance;
      }
      $(".offRight").removeClass("offRight").addClass("offLeft");
      this.currentInstance = this.instances.length;
      var currentEx = this.instances.length + 1;
      this.instances.push({
        name: "Příklad " + currentEx,
        baseIP: "192.0.2.0",
        basePrefix: 24,
        subnets: [],
        subnetsCount: "00000000000000000000000000000000",
        answers: false,
        update: false,
      });
      if (subnetting.instances.length == 1) {
        this.$nextTick(() => {
          $(".main .instance").eq(subnetting.currentInstance).removeClass("offRight");
        });
      }
      this.instances[this.currentInstance].basePrefix = rand(parseInt(this.basePrefixMin), parseInt(this.basePrefixMax));
      var subnetCount = rand(parseInt(this.subnetCountMin), parseInt(this.subnetCountMax));
      if (Math.pow(2, 29 - this.instances[this.currentInstance].basePrefix) < subnetCount) {
        subnetCount = Math.pow(2, 29 - this.instances[this.currentInstance].basePrefix);

      }

      this.instances[this.currentInstance].baseIP = this.toIP(this.baseIPIn, this.instances[this.currentInstance].basePrefix);

      this.instances[this.currentInstance].answers = false;
      $(".settings").hide();
      this.instances[this.currentInstance].subnets = [];
      this.instances[this.currentInstance].subnetsCount = "00000000000000000000000000000000";

      //generace počtu routerů(schéma);
      var rCountOpts = [];
      for (var i = 1; i <= 3; i++) {
        var limitS = (i * 2) - 1;
        var limitE = (i * 5) - 1;
        if (subnetCount >= limitS && subnetCount <= limitE) {

          if (rCountOpts.length == 0) rCountOpts.push(i);
          else if (rand(1, 2) == 1) rCountOpts.push(i);
        }
      }
      var rCount = rCountOpts[rand(1, rCountOpts.length) - 1];


      for (var i = 0; i < subnetCount; i++) {
        if (this.countHosts() >= this.hostsMax(this.currentInstance)) {
          alert("Víc podsítí nelze vytvořit");
          break;
        }
        var limit;
        var minLimit = (subnetCount - i - 1) * 8;
        if (this.instances[this.currentInstance].basePrefix <= 24) {
          //  limit = Math.ceil(((subnetCount - i - 2)) + Math.pow((subnetCount - i - 1), 1.8));
          limit = Math.ceil(Math.pow((subnetCount - i), 2) - (i * 2));
          if (limit < minLimit) limit = minLimit;
        } else {
          limit = minLimit;
        }
        var max = this.convertToBit(bitFloor(this.hostsMax(this.currentInstance) - this.countHosts() - limit));
        if (max < 3) max = 3;
        var bitRange = rand(3, max);
        if (rCount > subnetCount - i) bitRange = 2;
        this.addToSubnetsCount(bitRange, 1);
        this.instances[this.currentInstance].subnets.push({
          nth: 0,
          name: "Subnet " + 'abcdefghijklmnopqrstuvwxyz' [this.instances[this.currentInstance].subnets.length].toUpperCase(),
          hosts: this.randInBitRange(bitRange),
          bitCeil: bitRange,
          prefix: 32 - bitRange,
          mask: this.prefixToMask(32 - bitRange),
          parent: "",
          firstA: "",
          lastA: "",
          firstH: "",
          lastH: "",
          inFirstA: "",
          inLastA: "",
          inFirstH: "",
          inLastH: "",
          inMask: "",
          inPrefix: "",
          firstACheckColor: "",
          lastACheckColor: "",
          firstHCheckColor: "",
          lastHCheckColor: "",
          prefixCheckColor: "",
          maskCheckColor: ""
        });
      }
      this.instances[this.currentInstance].subnets = shuffle(this.instances[this.currentInstance].subnets, rCount - 1);

      for (var i = 0; i < (rCount - 1); i++) {
        this.instances[this.currentInstance].subnets[this.instances[this.currentInstance].subnets.length - i - 1].parent = "btw";
      }

      for (i = 0; i < this.instances[this.currentInstance].subnets.length; i++) {
        this.instances[this.currentInstance].subnets[i].name = "Subnet " + 'abcdefghijklmnopqrstuvwxyz' [i].toUpperCase();
        this.instances[this.currentInstance].subnets[i].nth = (i + 1);
      }
      this.instances[this.currentInstance].subnets.sort(function(a, b) {
        if (a.prefix < b.prefix) return -1;
        if (a.prefix > b.prefix) return 1;
        return 0;
      });
      var base = this.baseIPBit(this.currentInstance);
      var that = this;
      this.instances[this.currentInstance].subnets.forEach(function(item) {
        item.firstA = that.bitToA(base);
        item.firstH = that.bitToA(that.bitAdd(base, "00000000000000000000000000000001"))
        base = that.bitAdd(base, that.prefixToBit(item.prefix));
        item.lastA = that.bitToA(that.bitDeduct(base, "00000000000000000000000000000001"));
        item.lastH = that.bitToA(that.bitDeduct(base, "00000000000000000000000000000010"));
      });
      this.instances[this.currentInstance].subnets.sort(function(a, b) {
        if (a.name[7] < b.name[7]) return -1;
        if (a.name[7] > b.name[7]) return 1;
        return 0;
      });



      var width = 1110;
      var height = 520;
      var offset = 350;
      var offsetSubnetsX = 150;
      var offsetSubnetsY = 125;


      var rs = [];
      var rsBetween = [];
      for (var i = 0; i < rCount; i++) {
        rs.push({
          position: {
            x: 0,
            y: 0
          },
          subnets: []
        });
      }

      var rDistribution = [];
      var subnetsTotal = this.instances[this.currentInstance].subnets.length;

      for (var i = 0; i < rCount; i++) {
        var rLimitMin = subnetsTotal - (((rCount - (i + 1)) * 4) + (rCount - 1));

        if (rLimitMin < 1) rLimitMin = 1;
        var rLimitMax = subnetsTotal - (rCount - 1) - (rCount - (i + 1));
        if (rLimitMax > 4) rLimitMax = 4;
        var add = rand(rLimitMin, rLimitMax);

        rDistribution.push(add);
        subnetsTotal -= add;
      }

      var k = 0;
      for (var i = 0; i < rDistribution.length; i++) {
        for (var j = 0; j < rDistribution[i]; j++) {
          rs[i].subnets.push({
            name: this.instances[this.currentInstance].subnets[k].name,
            hosts: this.instances[this.currentInstance].subnets[k].hosts,
            position: {
              x: 0,
              y: 0
            },
            placement: ""
          });
          k++;

        }
      }

      for (var i = 1; i < rCount; i++) {


        rsBetween.push({
          name: this.instances[this.currentInstance].subnets[k].name,
          hosts: this.instances[this.currentInstance].subnets[k].hosts,
          position: {
            x: 0,
            y: 0
          },
          placement: ""
        });
        k++;
      }

      /*  for (var i = 0; i < this.instances[this.currentInstance].subnets.length; i++) {
          this.instances[this.currentInstance].subnets[i]
        }*/
      $(document).ready(function() {
        var imgR = new Image();

        imgR.onload = function() {
          drawImageRs();
        }
        imgR.src = "img/r.png";
        var imgS = new Image();
        imgS.onload = function() {
          drawImageSs();
        }
        imgS.src = "img/s.png";

        var canvas = document.getElementById("canvas" + subnetting.currentInstance);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (rCount == 1) {
          rs[0].position.x = width / 2;
          rs[0].position.y = height / 2;
        } else if (rCount == 2) {
          rs[0].position.x = width / 2 - offset / 2;
          rs[0].position.y = height / 2;

          rs[1].position.x = width / 2 + offset / 2;
          rs[1].position.y = height / 2;
        } else if (rCount == 3) {
          rs[0].position.x = width / 2 - offset;
          rs[0].position.y = height / 2;

          rs[1].position.x = width / 2;
          rs[1].position.y = height / 2;

          rs[2].position.x = width / 2 + offset;
          rs[2].position.y = height / 2;
        } else {
          throw new Error("Diagram draw error. Out of range.");
        }
        for (var i = 0; i < rCount; i++) {
          var sCount = rs[i].subnets.length;
          var subnetsUp;
          if (sCount % 2 != 0) {
            if (rand(1, 2) == 1) {
              subnetsUp = Math.ceil(sCount / 2);
            } else {
              subnetsUp = Math.floor(sCount / 2);
            }
          } else {
            subnetsUp = sCount / 2;
          }


          var subnetsDown = sCount - subnetsUp;
          if ((subnetsUp < 0 || subnetsUp > 2) || (subnetsDown < 0 || subnetsDown > 2)) throw new Error("Diagram draw error. instances[this.currentInstance].subnets out of range.");
          for (var j = 0; j < subnetsUp; j++) {

            var subnet = rs[i].subnets[j];
            subnet.position.y = height / 2 - offsetSubnetsY;

            if (subnetsUp == 1) {
              subnet.position.x = rs[i].position.x;
            } else if (subnetsUp == 2) {
              subnet.position.x = rs[i].position.x + (j - 0.5) * offsetSubnetsX;
            }
            subnet.placement = "up";
          }
          for (var j = subnetsUp; j < sCount; j++) {
            var subnet = rs[i].subnets[j];
            subnet.position.y = height / 2 + offsetSubnetsY;
            if (subnetsDown == 1) {
              subnet.position.x = rs[i].position.x;
            } else if (subnetsDown == 2) {
              subnet.position.x = rs[i].position.x + (j - subnetsUp - 0.5) * offsetSubnetsX;
            } else {
              throw new Error("Diagram draw error. Out of range.");
            }
            subnet.placement = "down";
          }
        }
        ctx.beginPath();
        var wirelessSize = 7;
        ctx.font = '18px Nunito';
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        for (var i = 0; i < rCount; i++) {
          if (i != 0) {
            ctx.moveTo(rs[i].position.x, rs[i].position.y + wirelessSize);
            ctx.lineTo(rs[i - 1].position.x + (offset / 2) - wirelessSize, rs[i - 1].position.y + wirelessSize);
            ctx.lineTo(rs[i].position.x - (offset / 2) + wirelessSize, rs[i].position.y - wirelessSize);
            ctx.lineTo(rs[i - 1].position.x, rs[i - 1].position.y - wirelessSize);

            ctx.fillText(rsBetween[i - 1].name, (rs[i].position.x + rs[i - 1].position.x) / 2, rs[i].position.y - 50);

            ctx.fillText(rsBetween[i - 1].hosts + " hosts", (rs[i].position.x + rs[i - 1].position.x) / 2, rs[i].position.y - 25);
          }
          for (var j = 0; j < rs[i].subnets.length; j++) {
            ctx.moveTo(rs[i].position.x, rs[i].position.y);
            ctx.lineTo(rs[i].subnets[j].position.x, rs[i].subnets[j].position.y);

            var margin;
            if (rs[i].subnets[j].placement == "up") margin = -60;
            else margin = 45;

            ctx.fillText(rs[i].subnets[j].name, rs[i].subnets[j].position.x, rs[i].subnets[j].position.y + margin);

            ctx.fillText(rs[i].subnets[j].hosts + " hosts", rs[i].subnets[j].position.x, rs[i].subnets[j].position.y + margin + 25);
          }
        }

        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.stroke();




        function drawImageRs() {
          for (var i = 0; i < rCount; i++) {
            ctx.drawImage(imgR, rs[i].position.x - imgR.width / 2, rs[i].position.y - imgR.height / 2);
          }
        }

        function drawImageSs() {
          for (var i = 0; i < rCount; i++) {
            for (var j = 0; j < rs[i].subnets.length; j++) {
              ctx.drawImage(imgS, rs[i].subnets[j].position.x - imgS.width / 2, rs[i].subnets[j].position.y - imgS.height / 2);
            }
          }
        }
        if (subnetting.specsAnimations) {
          setTimeout(function() {
            $(".main .instance").eq(subnetting.currentInstance).removeClass("offRight");
          }, 300);
        } else {
          if (subnetting.currentInstance == 0) {

            $(".main .instance").eq(subnetting.currentInstance).removeClass("offLeft");
          } else {
            $(".main .instance").eq(previousInstance).addClass("offLeft");
            $(".main .instance").eq(subnetting.currentInstance).removeClass("offRight");
          }
        }
        subnetting.currentInstanceLazy = subnetting.instances.length - 1;

      });
    },
    check: function() {
      var rightColor = "green";
      var notRightColor = "#f33";

      for (var i = 0; i < this.instances[this.currentInstance].subnets.length; i++) {
        var inFirstA = this.instances[this.currentInstance].subnets[i].inFirstA.replace(/\s/g, '');
        var inLastA = this.instances[this.currentInstance].subnets[i].inLastA.replace(/\s/g, '');
        var inFirstH = this.instances[this.currentInstance].subnets[i].inFirstH.replace(/\s/g, '');
        var inLastH = this.instances[this.currentInstance].subnets[i].inLastH.replace(/\s/g, '');

        var inPrefix = this.instances[this.currentInstance].subnets[i].inPrefix.replace(/\s/g, '');
        var inMask = this.instances[this.currentInstance].subnets[i].inMask.replace(/\s/g, '');

        var firstA = this.instances[this.currentInstance].subnets[i].firstA;
        var lastA = this.instances[this.currentInstance].subnets[i].lastA;
        var firstH = this.instances[this.currentInstance].subnets[i].firstH;
        var lastH = this.instances[this.currentInstance].subnets[i].lastH;
        var prefix = this.instances[this.currentInstance].subnets[i].prefix;
        var mask = this.instances[this.currentInstance].subnets[i].mask;

        if (firstA == inFirstA) {
          this.instances[this.currentInstance].subnets[i].firstACheckColor = rightColor;
        } else {
          this.instances[this.currentInstance].subnets[i].firstACheckColor = notRightColor;
        }
        if (lastA == inLastA) {
          this.instances[this.currentInstance].subnets[i].lastACheckColor = rightColor;
        } else {
          this.instances[this.currentInstance].subnets[i].lastACheckColor = notRightColor;
        }

        if (firstH == inFirstH) {
          this.instances[this.currentInstance].subnets[i].firstHCheckColor = rightColor;
        } else {
          this.instances[this.currentInstance].subnets[i].firstHCheckColor = notRightColor;
        }
        if (lastH == inLastH) {
          this.instances[this.currentInstance].subnets[i].lastHCheckColor = rightColor;
        } else {
          this.instances[this.currentInstance].subnets[i].lastHCheckColor = notRightColor;
        }

        if (prefix == inPrefix.replace('/', '')) {
          this.instances[this.currentInstance].subnets[i].prefixCheckColor = rightColor;
        } else {
          this.instances[this.currentInstance].subnets[i].prefixCheckColor = notRightColor;
        }

        if (mask == inMask) {
          this.instances[this.currentInstance].subnets[i].maskCheckColor = rightColor;
        } else {
          this.instances[this.currentInstance].subnets[i].maskCheckColor = notRightColor;
        }


      }
    },
    showResults: function() {
      this.instances[this.currentInstance].answers = true;
      /*setTimeout(function(){
        subnetting.instances[subnetting.currentInstance].update = true;
      },10);*/
      this.$nextTick(() => {
        subnetting.instances[subnetting.currentInstance].update = true;
      });
    },
    resetFirstA: function(item) {
      item.firstACheckColor = "";
    },
    resetLastA: function(item) {
      item.lastACheckColor = "";
    },
    resetFirstH: function(item) {
      item.firstHCheckColor = "";
    },
    resetLastH: function(item) {
      item.lastHCheckColor = "";
    },
    resetMask: function(item) {
      item.maskCheckColor = "";
    },
    resetPrefix: function(item) {
      item.prefixCheckColor = "";
    },

    setDiff1: function() {
      if (!this.inputDisabled) {
        this.baseIPIn = "192.0.2.0";
        this.prefixIn = "24";
        this.subnetCountIn = "2-3";
        this.diff = "1";
      }
    },
    setDiff2: function() {
      if (!this.inputDisabled) {
        this.baseIPIn = "192.0.2.0";
        this.prefixIn = "24";
        this.subnetCountIn = "4-6";
        this.diff = "2";
      }
    },
    setDiff3: function() {
      if (!this.inputDisabled) {
        this.baseIPIn = "192.0.2.?";
        this.prefixIn = "24-26";
        this.subnetCountIn = "4-8";
        this.diff = "3";
      }
    },
    setDiff4: function() {
      if (!this.inputDisabled) {
        this.baseIPIn = "";
        this.prefixIn = "22-26";
        this.subnetCountIn = "4-8";
        this.diff = "4";
      }
    },
    toCanvasId: function(index) {
      return "canvas" + index;
    },
    /*save: function() {
      var input = $("#switch input").val();
      var valid = true;

      if (!isNumeric(input) || input % 1 != 0) valid = false;
      if (input < 2 || input > 14) valid = false;
      if (valid) {
        $("#switch span").eq(0).text($("#switch input").val());
        if ($("#switch input").val() <= 4) $("#switch span").eq(1).text("subnety");
        else $("#switch span").eq(1).text("subnetů");
        $("#switch input").hide();
        $("#switch span").eq(0).show();
      } else {
        subnetting.picked = null;
        $("#switch span").eq(0).text("custom");
        $("#switch span").eq(1).text("");
        $("#switch input").val("");
        $("#switch input").hide();
        $("#switch span").eq(0).show();
        $("#c").prop('checked', false);
      }
    },
    cust: function() {
      if (!this.inputDisabled) {
        var that = this;
        $("#switch span").eq(0).hide();
        $("#switch span").eq(1).text("");
        $("#switch input").show();
        $("#switch input").focus();
        $("#switch input").focusout(function() {
          that.save();
        });

      }
    }*/
  },
  beforeMount() {
    var json = getCookie("subnettingSettings");
    if (json.length > 0) {
      var data = JSON.parse(json);
      this.subnetCountIn = data.subnetCountIn;
      this.baseIPIn = data.baseIPIn;
      this.prefixIn = data.prefixIn;
      this.specsOpts = data.specsOpts;
      this.specsReserve = data.specsReserve;
      this.specsSeed = data.specsSeed;
      this.specsAnimations = data.specsAnimations;
    }

  },
});

var inAnim = false;
$(".sectionL button").click(function() {

  if (!inAnim) {
    inAnim = true;
    var theButton = $(this);
    theButton.children().children().css("animation", "arrowUp .5s");
    setTimeout(function() {
      theButton.children().children().css("animation", "");
      inAnim = false;
    }, 500);
  }

});
$(".main").css("visibility", "visible");
$(function() {
  $(".helpBox").resizable();
  $(document).on("click", ".mods>div .profile", function() {

    if ($(this).parent().hasClass("expand")) {
      $(this).parent().removeClass('expand');
    } else {
      $(".mods>div").removeClass('expand');
      $(this).parent().addClass('expand');
    }

  });

});