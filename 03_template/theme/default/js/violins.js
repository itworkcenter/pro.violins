var states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};


// ADD STATES
function setState(data) {
    var $state = jQuery("#StateList"),
        listTempl = function (key, value) {
            return '<li id="' + key + '" class="select-list-item"><a href="list.html#' + key + '">' + value + '</a></li>'
        },
        listStr = "";

    if (data) {
        for (var i in data) {
            var state = data[i];
            listStr += listTempl(i, state);
        }
        $state.html(listStr);
    }
}

// INITIALIZE
setState(states);


// LOCATION INITIAL
function getHrefargs() {
    var arg = location.hash;
    if (arg) {
        arg = arg.match(/\w+/ig)[0];
    }
    return arg;
}
var key = getHrefargs();

if (key) {
    jQuery("#SelectShow").html(states[key]);
    jQuery("#" + key).addClass("selected").siblings(".selected").removeClass("selected");
}

jQuery(document).on("click", ".select-list-item", function () {

    jQuery(this).toggleClass("selected").siblings(".selected").removeClass("selected");

    var $modal = jQuery(this).closest(".modal"),
        $close = jQuery(".close", $modal),
        selectedVal = jQuery("a", this).html();

    jQuery("#SelectShow").html(selectedVal);

    $close.click();
})

// STATE SELECT
jQuery(window).scroll(function () {
    var $state = jQuery("#Location"),
        stateTop = $state.offset().top,
        winTop = jQuery(this).scrollTop(),
        cls = "active";

    if (stateTop < winTop) {
        if (!$state.hasClass(cls)) {
            $state.addClass(cls);
        }
    } else {
        if ($state.hasClass(cls)) {
            $state.removeClass(cls);
        }
    }

})

jQuery(document).on("click", ".page-list .item a", function () {
    if (getHrefargs()) {
        var href = jQuery(this).attr("href");

        jQuery(this).attr("href", href + "#" + getHrefargs())
    }
})

jQuery(document).on("click", ".item.video", function(){
    var youtubeId = jQuery(this).data("youtube-id");
    new PopVideo({src: '//www.youtube.com/embed/' + youtubeId + '?autoplay=1'});
});
