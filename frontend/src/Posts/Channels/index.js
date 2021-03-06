import { useEffect, useState } from 'react';
import './Channels.scss';
import Select, { NonceProvider } from 'react-select';
import { getChannels } from '../../shared/channels.js';

const dropStyling = {
    control: (base, state) => ({
      ...base,
      minHeight: 31,
      width: 275,
      fontFamily: "Avenir",
      fontSize: 14,
      cursor: "text",
    }),
  
    option: (styles) => {
      return{
        ...styles,
        height: 31,
        width: 275,
        cursor: "pointer",
        fontFamily: "Avenir",
      }
    },
  
    input: styles => ({
      ...styles,
      color: "black",
      fontFamily: "Avenir",
    }),
  
    menu: styles => ({
      ...styles,
      position: "absolute",
      top: "20px",
    }),
}

function Channels() {
    const channels = getChannels();
    const [channel, setChannel] = useState([]);

    const onDropdownChange = (e) => {
        setChannel(Array.isArray(e) ? e.map(x => x.value) : []);
    };
    const changePage = (effect) => {
        effect.preventDefault();
        let channelsString = '';
        if (channel !== undefined || channel.length !== 0) {
            channel.forEach(function (item, index) {
                channelsString = channelsString + item + ",";
            });
        }
        if (channelsString !== '') {
            console.log("channelstring: ", channelsString);
            sessionStorage.setItem("channels", channelsString);
            sessionStorage.removeItem("searchChannel");
            sessionStorage.removeItem("searchTitle");
            sessionStorage.removeItem("searchTime");
            window.location.href = `http://localhost:3000/posts?multichannel=` + channelsString;
        }
        else {
            window.location.href = `http://localhost:3000/posts`;
        }
    };
    return (
        <div>
          <Select 
            value={channels.filter(obj => channel.includes(obj.value))}
            options={channels} 
            maxMenuHeight={100}
            isMulti={true}
            isClearable={true}
            openMenuOnClick={false} 
            placeholder='Channel Filter' 
            styles={dropStyling} 
            onChange={onDropdownChange} />
            <button id='submitCat_button' onClick={changePage}>Filter Channels</button>
        </div>
    );

}

export default Channels;