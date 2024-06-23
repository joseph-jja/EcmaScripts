import * as events from 'client/dom/events';
import * as ajax from 'client/net/ajax';
import * as xml from 'client/browser/xml';
import * as typeCheck from 'utils/typeCheck';

// components
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

function getFirstNodeText( XMLDOMDocument, nodeName ) {

    var node = XMLDOMDocument.getElementsByTagName( nodeName );
    return node[ 0 ].childNodes[ 0 ].nodeValue;
}

function parseSkills( XMLDOMDocument ) {

    var skillarea = XMLDOMDocument.getElementsByTagName( "skillarea" )[ 0 ];

    var title = skillarea.getElementsByTagName( "title" )[ 0 ];

    var result = '<hr/>';
    result += '<span class="skill_prof"><a href="javascript:WebBrowser.dom.toggleDisplay(\'skills\');">';
    result += title.childNodes[ 0 ].nodeValue;
    result += '</a></span>';
    result += '<br /><div id="skills"><ul>';

    var skillset = skillarea.getElementsByTagName( "skillset" );
    for ( let i = 0; i < skillset.length; i++ ) {
        // need titles
        var title = skillset[ i ].getElementsByTagName( "title" )[ 0 ];
        result += '<li>';
        result += title.childNodes[ 0 ].nodeValue + ": ";
        var skills = skillset[ i ].getElementsByTagName( "skill" );
        // then need skills
        for ( let s = 0; s < skills.length; s++ ) {
            var skill = skills[ s ].childNodes[ 0 ].nodeValue;
            //var skill_level = skills[ s ].getAttribute( "level" );
            result += skill;
            if ( s < skills.length - 1 ) {
                result += ", ";
            }
        }
        result += '</li>';
    }

    result += '</ul></div>';

    return result;
}

function parseMisc( XMLDOMDocument ) {

    var misc = XMLDOMDocument.getElementsByTagName( "misc" );

    var miscExp = misc[ 0 ].getElementsByTagName( "misc_exp" );

    var otherexp = miscExp[ 0 ];
    var militaryexp = miscExp[ 1 ];

    var result = '<span class="misc"><a href="javascript:WebBrowser.dom.toggleDisplay(\'misc1\');">';
    result += otherexp.getElementsByTagName( "name" )[ 0 ].childNodes[ 0 ].nodeValue;
    result += '</a></span><br /><div id="misc1"><ul>';

    var items = otherexp.getElementsByTagName( "item" );
    for ( let i = 0; i < items.length; i++ ) {
        if ( items[ i ].childNodes.length === 1 ) {
            result += "<li>" + items[ i ].childNodes[ 0 ].nodeValue + "</li>";
        } else {
            result += "<li>";
            for ( let j = 0; j < items[ i ].childNodes.length; j++ ) {
                if ( items[ i ].childNodes[ j ].length ) {
                    result += items[ i ].childNodes[ j ].nodeValue;
                } else {
                    if ( items[ i ].childNodes[ j ].nodeName === "url" ) {
                        // here we have our url
                        var url = items[ i ].childNodes[ j ].childNodes[ 0 ].nodeValue;
                        result += '<a href="' + url + '">' + url + '</a>';
                    }
                }
            }
            result += "</li>";
        }
    }

    result += '</ul></div>';

    result += '<span class="misc"><a href="javascript:WebBrowser.dom.toggleDisplay(\'misc2\');">';
    result += militaryexp.getElementsByTagName( "name" )[ 0 ].childNodes[ 0 ].nodeValue;
    result += '</a></span><br /><div id="misc2"><ul>';

    items = militaryexp.getElementsByTagName( "item" );
    for ( let i = 0; i < items.length; i++ ) {
        result += "<li>" + items[ i ].childNodes[ 0 ].nodeValue + "</li>";
    }

    result += '</ul></div>';

    return result;
}

function parseDegree( XMLDOMDocument ) {

    var result = '<span class="misc"><a href="javascript:WebBrowser.dom.toggleDisplay(\'education\');">EDUCATION</a></span>';
    result += '<br /><div id="education">';

    var degrees = XMLDOMDocument.getElementsByTagName( "academics" );

    var level = degrees[ 0 ].getElementsByTagName( "level" )[ 0 ].childNodes[ 0 ].nodeValue;
    var major = degrees[ 0 ].getElementsByTagName( "major" )[ 0 ].childNodes[ 0 ].nodeValue;
    var inst = degrees[ 0 ].getElementsByTagName( "institution" )[ 0 ].childNodes[ 0 ].nodeValue;
    var mon = degrees[ 0 ].getElementsByTagName( "month" )[ 0 ].childNodes[ 0 ].nodeValue;
    var year = degrees[ 0 ].getElementsByTagName( "year" )[ 0 ].childNodes[ 0 ].nodeValue;

    var para = degrees[ 0 ].getElementsByTagName( "para" )[ 0 ].childNodes[ 0 ].nodeValue;

    result += "<ul><li>" + level + " in " + major + ", " + inst + ", ";
    result += mon + " " + year + ". " + para + "</li></ul></div>";

    return result;
}

function parseJobs( XMLDOMDocument ) {

    // this gives us a list of the actual jobs in the page
    var jobNodes = XMLDOMDocument.getElementsByTagName( "job" );

    // we should try

    var result = '<span class="profexp"><a href="javascript:WebBrowser.dom.toggleDisplay(\'profexp\');">PROFESSIONAL EXPERIENCE</a></span>';
    result += '<br /><div id="profexp"><br />';

    for ( let i = 0; i < jobNodes.length; i++ ) {

        //var job = jobNodes[ i ].childNodes;

        // get the current job as a document object
        var jobNode = jobNodes[ i ].cloneNode( true );

        var jobtitle = jobNode.getElementsByTagName( "jobtitle" )[ 0 ].childNodes[ 0 ].nodeValue;
        var company = jobNode.getElementsByTagName( "company" )[ 0 ].childNodes[ 0 ].nodeValue;

        /*let url;
        if ( jobNode.getElementsByTagName( "url" ) ) {
            url = jobNode.getElementsByTagName( "company" )[ 0 ].childNodes[ 0 ].nodeValue;
        }*/

        var jobCity = jobNode.getElementsByTagName( "city" )[ 0 ].childNodes[ 0 ].nodeValue;
        var stateObj = jobNode.getElementsByTagName( "state" )[ 0 ];
        var jobLocation = jobCity;
        if ( typeCheck.exists( stateObj ) && stateObj.childNodes.length > 0 ) {
            jobLocation = jobCity + ", " + stateObj.childNodes[ 0 ].nodeValue;
        }

        var jobTasks = jobNode.getElementsByTagName( "achievement" );
        var jobMonth = jobNode.getElementsByTagName( "month" );
        var jobYear = jobNode.getElementsByTagName( "year" );
        var jobDates = "";
        if ( typeCheck.exists( jobMonth ) ) {
            jobDates = jobMonth[ 0 ].childNodes[ 0 ].nodeValue + " " + jobYear[ 0 ].childNodes[ 0 ].nodeValue;
            jobDates += " - ";
            try {
                jobDates += jobMonth[ 1 ].childNodes[ 0 ].nodeValue + " ";
            } catch ( _E ) {
                // ignore
            }
            jobDates += jobYear[ 1 ].childNodes[ 0 ].nodeValue;
        }

        var jobList = '';
        for ( let j = 0; j < jobTasks.length; j++ ) {
            jobList += "<li>";
            jobList += jobTasks[ j ].childNodes[ 0 ].nodeValue;
            jobList += ".</li>";
        }
        result += '<span class="empmnt">' + jobtitle + ", " + company;
        result += ", " + jobLocation + " (" + jobDates + ")";
        result += '</span><ul>' + jobList + '</ul>';
    }
    result += '</div>';
    return result;
}

events.addOnLoad( () => {

    menu.basicMenu();
    footer( 'footer' );

    var obj = document.getElementById( "container" );

    let callback;
    try {

        callback = function () {
            if ( this.xmlhttp.readyState === 4 ) {
                var result = this.xmlhttp.responseText;
                var DOMDoc = xml.getAsXMLDocument( result );

                //const jsonData = xml.xml2json( DOMDoc );

                var header = '<table width="100%"><tr><td align="left">';

                var _url = getFirstNodeText( DOMDoc, "url" );

                header += '</td></tr></table>';

                var jobs = parseJobs( DOMDoc );

                var degrees = parseDegree( DOMDoc );

                var misc = parseMisc( DOMDoc );

                var skills = parseSkills( DOMDoc );

                header = '<div style="text-align:center; font-weight: bold;">header not displayed for privacy</div>';

                obj.innerHTML = header + skills + jobs + degrees + misc;
            }
        };

        // try hard parsing here
        ajax.get( callback, "resume_data.xml", null );

    } catch ( xmlException ) {

        if ( !xml.transformXML( "resume_data.xml", "resume_default.xsl", obj ) ) {
            alert( "Your browser is not supported!!!" );
            var res = "Your browser is not supported for this feature.";
            res += "<br />Sorry I tried!";
            res += "<br />So far, known supported browsers are IE 6.0+ and newer Gecko based browsers.";
            res += "<br />If you use IE make sure ActiveX is enabled.";
            obj.innerHTML = res;
        }
    }
} );
