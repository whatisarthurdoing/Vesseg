import React, {Image} from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


import './CSS/Evaluation.css';
import image1 from "../img/examples/example_1.png";
import image2 from "../img/examples/example_2.png";
import image3 from "../img/examples/example_3.png";
import image4 from "../img/examples/example_4.png";
import image5 from "../img/examples/example_5.png";

export default function Evaluation() {

  //Carousel
  const responsive = {
    0: {items: 2},
    1024: {items: 2},
  };

  /* 
    Rating
  */

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const handleDragStart = (e) => e.preventDefault();

  // Content of carousel: images
  // TODO: API request get images of project, dynamic rendering
  const items = [
    <img src={image1} onDragStart={handleDragStart} role="presentation" />,
    <img src={image2} onDragStart={handleDragStart} role="presentation" />,
    <img src={image3} onDragStart={handleDragStart} role="presentation" />,
    <img src={image4} onDragStart={handleDragStart} role="presentation" />,
    <img src={image5} onDragStart={handleDragStart} role="presentation" />,
  ];

  return (
    <div id='evaluation'>
      <h1>Evaluation</h1>
      <div id="imageLabeling">
        <p id="originalImageText"><b>Original Image</b></p>
        <p id="predictionText"><b>Prediction</b></p>
      </div>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: {
            items: 2,
          },
          1024: {
            items: 2
          }
        }}
      />
      <div id='rating'>
        <StyledRating
          name="highlight-selected-only"
          defaultValue={2}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
        />
        <p id="ratingText">test</p>
      </div>
    </div>
  )
}
