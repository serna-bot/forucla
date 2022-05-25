import clubreclogo from '../assets/clubreclogo.png';
import conflogo from '../assets/conflogo.png';
import memelogo from '../assets/memelogo.png';
import relationshiplogo from '../assets/relationshiplogo.png';
import schooladvicelogo from '../assets/schooladvicelogo.png';
import sportslogo from '../assets/sportslogo.png';

export function getLogo(props) {
    if (props === 'Memes') {
        return memelogo;
    } else if (props === 'School Advice') {
        return schooladvicelogo;
    } else if (props === 'Confessions') {
        return conflogo;
    } else if (props === 'Relationships') {
        return relationshiplogo;
    } else if (props === 'Club Recruitment') {
        return clubreclogo;
    } else if (props === 'Sports') {
        return sportslogo;
    }
}
