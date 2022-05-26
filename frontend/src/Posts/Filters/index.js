import './Filters.scss';

function Filters() {
    let channelString = sessionStorage.getItem("channels");
    let searchChannel = sessionStorage.getItem("searchChannel");
    let searchTime = sessionStorage.getItem("searchTime");
    let time;
    let channelFilters;
    if (sessionStorage["channels"]) {
        channelFilters = channelString.split(",");
        channelFilters.pop();
    }
    console.log(searchChannel);
    if (sessionStorage["searchTime"]) {
        console.log("time ", searchTime)
        if (searchTime === '1') {
            time = "1 hour ago";
        } 
        else if (searchTime === '24') {
            time = "1 day ago";
        }
        else if (searchTime === '168') {
            time = "1 week ago";
        }
        else if (searchTime === '5040') {
            time = "1 month ago";
        }
        else if (searchTime === '60480') {
            time = "a year ago";
        }
        else if (searchTime === '604800') {
            time = "a long time ago";
        }
        console.log(time);
    }
    return (
        <div>
            {sessionStorage["channels"] && (
                <div className='Filters'>
                    <p>Channel Filters: </p>
                    {
                        (() => {
                        if (channelFilters !== undefined)
                            return (
                            channelFilters.map(function (currVal) {
                                return <div id='indiv'>{currVal}</div>;
                            })
                            )
                        })()
                    }
                </div>
            )}
            { (sessionStorage["searchTime"] || sessionStorage["searchChannel"]) && (
                <div className='Filters'>
                    <p>Search Filters: </p>
                    {(searchChannel !== null) && (
                        <div id='indiv'>{searchChannel}</div>
                    )}
                    {(searchTime !== null) && (
                        <div id='indiv'>{time}</div>
                    )}   
                </div>
            )}
        </div>
    );
}

export default Filters;