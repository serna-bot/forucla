import './Calendar.scss'


function Calender () {
    function redirectToUCLAHappening() {
        window.open('http://happenings.ucla.edu/', '_blank');
    }
    function redirectBruinLearn() {
        window.open('https://bruinlearn.ucla.edu/', '_blank');
    }
    function redirectMyUCLA() {
        window.open('https://my.ucla.edu/', '_blank');
    }
    return (
        <div id="calendar">
            
            <h1>Spring Quarter</h1>
            <h1>2021-2022</h1>
            <h2>Friday, Week 10</h2>
            <hr></hr>
            <div id='redirect-buttons'>
                <button onClick={redirectToUCLAHappening}> Events Today</button>
                <button onClick={redirectBruinLearn}>BruinLearn</button>
                <button onClick={redirectMyUCLA}>MyUCLA</button>
            </div>
        </div>
    );
}

export default Calender