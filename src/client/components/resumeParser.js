import * as xml from 'client/browser/xml';
import * as typeCheck from 'utils/typeCheck';

function getFirstNodeText( XMLDOMDocument, nodeName ) {

    var node = XMLDOMDocument.getElementsByTagName( nodeName );
    return node[ 0 ].childNodes[ 0 ].nodeValue;
}

function parseSkills( XMLDOMDocument ) {

    var skillarea = XMLDOMDocument.getElementsByTagName( "skillarea" )[ 0 ];

    var title = skillarea.getElementsByTagName( "title" )[ 0 ];

    var result = '<hr/>';
    result += '<span class="skill_prof section-heading">';
    result += title.childNodes[ 0 ].nodeValue;
    result += '</span>';
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
            var skill_level = skills[ s ].getAttribute( "level" );
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

    var misc_exp = misc[ 0 ].getElementsByTagName( "misc_exp" );

    var otherexp = misc_exp[ 0 ];
    var militaryexp = misc_exp[ 1 ];

    var result = '<span class="misc section-heading">';
    result += otherexp.getElementsByTagName( "name" )[ 0 ].childNodes[ 0 ].nodeValue;
    result += '</span><br /><div id="misc1"><ul>';

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

    result += '<span class="misc section-heading">';
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

    var result = '<span class="misc section-heading">EDUCATION</span>';
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

function parseJobs( XMLDOMDocument, options = {} ) {

    // this gives us a list of the actual jobs in the page
    const jobNodes = XMLDOMDocument.getElementsByTagName( "job" );

    const currentYear = new Date().getFullYear();
    const limitYear = options.limitYear ? currentYear - 15 : 1996;

    let result = '<span class="profexp section-heading">PROFESSIONAL EXPERIENCE</span>';
    result += '<br /><div id="profexp"><br />';

    result += Array.from( jobNodes ).filter( job => {

        const jobNode = job.cloneNode( true );

        const jobYear = jobNode.getElementsByTagName( "year" );
        if ( typeCheck.exists( jobYear ) && jobYear.length > 0 ) {
            const recent = Array.from( jobYear ).filter( year => {
                const yr = year.innerHTML;
                return ( +yr > limitYear );
            } );
            return ( recent.length > 0 );
        }
        return true;
    } ).map( job => {

        // get the current job as a document object
        const jobNode = job.cloneNode( true );

        var jobtitle = jobNode.getElementsByTagName( "jobtitle" )[ 0 ].childNodes[ 0 ].nodeValue;
        var company = jobNode.getElementsByTagName( "company" )[ 0 ].childNodes[ 0 ].nodeValue;

        var joburl = "";
        if ( jobNode.getElementsByTagName( "url" ) ) {
            var url = jobNode.getElementsByTagName( "company" )[ 0 ].childNodes[ 0 ].nodeValue;
        }

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
            } catch ( E ) {}
            jobDates += jobYear[ 1 ].childNodes[ 0 ].nodeValue;
        }

        let jobList = '';
        for ( let j = 0; j < jobTasks.length; j++ ) {
            jobList += "<li>";
            jobList += jobTasks[ j ].childNodes[ 0 ].nodeValue;
            jobList += ".</li>";
        }
        return `<span class="empmnt">${jobtitle}, ${company}, ${jobLocation} (${jobDates})</span><ul>${jobList}</ul>`;
    } ).reduce( ( acc, next ) => {
        return acc + next;
    } );

    result += '</div>';
    return result;
}

export default function processResume( result, options = {} ) {

    const DOMDoc = xml.getAsXMLDocument( result );

    const jsonData = xml.xml2json( DOMDoc );

    const url = getFirstNodeText( DOMDoc, "url" );

    const jobs = parseJobs( DOMDoc, options );

    const degrees = parseDegree( DOMDoc );

    const misc = parseMisc( DOMDoc );

    const skills = parseSkills( DOMDoc );

    const header = '<div style="text-align:center; font-weight: bold;">header not displayed for privacy</div>';

    return `${header}${skills}${jobs}${degrees}${misc}`;
}
