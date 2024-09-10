import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import '../../app/styles/shared/stats/statsTreats.scss';
import { useEffect } from 'react';
import { backEnd } from '../../pages/settings';


function StatTreats(props) {
    const { count } = props;

    const [animationProps, api] = useSpring(() => ({
        from: { number: 0 },
        number: count,
        config: { duration: 1000 },
    }));

    useEffect(() => {
        api.start({
            from: { number: 0 },
            to: { number: count },
        });
    }, [count, api]);

    return (
        <div className={props.clases}>
            <img src={ backEnd + props.image} alt="Stat Icon" />
            <animated.span id='out'>
                {animationProps.number.to(val => val.toFixed(0))}
            </animated.span>
        </div>
    );
}

StatTreats.propTypes = {
    image: PropTypes.string.isRequired,
    clases: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
};

export default StatTreats;
