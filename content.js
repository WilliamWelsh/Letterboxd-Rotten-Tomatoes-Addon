var OMDbAPIKey = ""; // http://www.omdbapi.com/apikey.aspx

var certifiedLogo = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/cf-lg.3c29eff04f2.png";
var freshLogo = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-fresh-lg.12e316e31d2.png";
var rottenLogo = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-rotten-lg.ecdfcf9596f.png";

// Get the IMDB href button's <a> href (which contains the IMDB ID)
var IMDbID = document.getElementsByClassName("micro-button track-event")[0].href;
IMDbID = IMDbID.replace('http://www.imdb.com/title/', '').replace('/maindetails', '');

// The URL of the movie on Rotten Tomatoes
var TomatoURL;

// Get a website as a string
function GetString (url)
{
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}
var RTScoreAndLink = JSON.parse(GetString('https://www.omdbapi.com/?apikey=' + OMDbAPIKey + '&tomatoes=true&i=' + IMDbID));

TomatoURL = RTScoreAndLink.tomatoURL.replace('http://', 'https://');

// Create the Rotten Tomatoes button at the bottom and add italics
var button = document.createElement("a"); // Create the <a> tag
button.appendChild(document.createTextNode("Rotten Tomatoes")); // Set the text
button.href = TomatoURL; // Set the button to link to the Rotten Tomatoes page
button.className = "micro-button"; // The class of Letterboxd's micro buttons (so it looks the same)
button.style.marginLeft = "3px"; // Give it a space
var footer = document.getElementsByClassName("micro-button track-event")[1];
footer.parentNode.insertBefore(button, footer.nextSibling); // Add it with the IMDB and TMDB buttons

// Set the report flag's margin to 0 so it's not shoved to a new line as a result of our new button
//var flag = document.getElementsByClassName("report-link has-icon icon-report tooltip tooltip-close-on-click cboxElement")[0];
//flag.style.marginLeft = "0";

// Get the JSON from the movie's website on Rotten Tomatoes,
// and then (and to) determine the icon type
var RTJSON = GetString(TomatoURL);

// On certain computers, the website is loaded differently
// Idk man, this is my first real project with js
// I have no idea what I'm doing
// If it works, it works
if (RTJSON.includes('mpscall['))
{
    var isCertified = RTJSON; // 1 = certified, 0 = not
    var fresh_rotten = RTJSON;

    isCertified = isCertified.substring(isCertified.indexOf('certified_fresh') + 20);
    isCertified = isCertified.substring(0, isCertified.indexOf('"'));

    fresh_rotten = fresh_rotten.substring(fresh_rotten.indexOf('fresh_rotten') + 17);
    fresh_rotten = fresh_rotten.substring(0, fresh_rotten.indexOf('"'));

    if (isCertified == 1)
    {
        AppendLogoAndPercent(certifiedLogo);
    }
    else
    {
        if (fresh_rotten == "fresh")
        {
            AppendLogoAndPercent(freshLogo);
        }
        else
        {
            AppendLogoAndPercent(rottenLogo);
        }
    }
}
else
{
    RTJSON = RTJSON.substring(RTJSON.indexOf('window.mpscall = ') + 17);
    RTJSON = RTJSON.substring(0, RTJSON.indexOf(';'));
    RTJSON = JSON.parse(RTJSON);

    if (RTJSON['cag[certified_fresh]'] == 1) // 1 = yes, certified
    {
        AppendLogoAndPercent(certifiedLogo);
    }
    else
    {
        if (RTJSON['cag[fresh_rotten]'] == "fresh")
        {
            AppendLogoAndPercent(freshLogo);
        }
        else
        {
            AppendLogoAndPercent(rottenLogo);
        }
    }
}

// Write the logo and percent by in the movie header field
function AppendLogoAndPercent (logoImage)
{
    var filmHeader = document.getElementById("featured-film-header");

    var logo = document.createElement("img");
    logo.setAttribute('src', logoImage);
    logo.setAttribute('height', '25');
    logo.setAttribute('width', '25');
    logo.style.verticalAlign = "middle";
    logo.style.display = "inline-block";
    filmHeader.appendChild(logo);

    var percentTag = document.createElement("p");
    percentTag.appendChild(document.createTextNode(' ' + RTScoreAndLink.Ratings[1].Value.replace('/100', '')));
    filmHeader.appendChild(percentTag);
}

// Add the perctange to the title header
//x.children[1].innerHTML += json_obj.Ratings[1].Value;