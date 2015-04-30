$( document ).ready()
{   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(run_crime);
    } else { 
        console.log( "Geolocation is not supported by this browser." );
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(run_crime);
    } else { 
        console.log( "Geolocation is not supported by this browser." );
    }
}

function show_map(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // let's show a map or do something interesting!
  
  console.log(latitude);
  console.log(longitude);
}

function get_latitude(position)
{
    return position.coords.latitude;
}

function get_longitude(position)
{
    return position.coords.longitude;
}

function create_date( currdate )
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    //var currdate = mm + "/" + dd + "/" + yyyy;
    
    //var currdate = "4/19/2015";
    
    var encoded_date = encodeURIComponent(currdate);
    
    return encoded_date;
}

function create_url(latitude, longitude) {
  var start_date = create_date("4/19/2015");
  var end_date = create_date("4/23/2015");
  
  //var api_url = "https://jgentes-Crime-Data-v1.p.mashape.com/crime?enddate=4%2F25%2F2015&lat=42.343060293817736&long=-83.0579091956167&startdate=4%2F19%2F2015";
  var api_url = "https://jgentes-Crime-Data-v1.p.mashape.com/crime?enddate=" + end_date + "&lat=" + latitude + "&long=" + longitude + "&startdate=" + start_date;
  return api_url;
}

function fetch_data(api_url)
{
    $.ajaxSetup({
      headers : {
        'X-Mashape-Key' : 'ZVUSkIHAkMmsho4ZtvtQDyU75ueZp1giqqcjsnzKrZUPDNa244',
        'Accept'        : 'application/json'
      }
    });
    
    $.getJSON(api_url, function(json) {
        $.each( json, function( key, value) {
            description = json[key]['description'];
            datetime = json[key]['datetime'];
            
            html_string = '<td>' + datetime + '</td>' + '<td>' + description + '</td>';
            $('#crimes > tbody:last').append('<tr>' + html_string + '</tr>');
        });
    });
}

function run_crime(position)
{
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var latitude = "42.343060293817736";
    var longitude = "-83.0579091956167";
    
    var api_url = create_url(latitude, longitude);
    
    fetch_data( api_url );
}