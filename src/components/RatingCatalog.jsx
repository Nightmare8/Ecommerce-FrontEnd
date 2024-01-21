import { Box, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';


const labels = {
    0: 'Nada similiar',
    10: 'Nada similar+',
    20: 'Poco similar',
    30: 'Poco similar+',
    40: 'Similar',
    50: 'Similar+',
    60: 'Muy similar',
    70: 'Muy similar+',
    80: 'Excelente',
    90: 'Excelente+',
    100: 'Excelente+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
const approximateToNewScale = (value) => {
    const newValue = Math.round(value / 10) * 10;
    return newValue === 0 ? 10 : newValue;
}

const transformToScale0To5 = (value) => {
    //Transform to scale 0 to 5, with 0.5 of precision
    let valor = value / 20;
    valor = Math.round(valor * 2) / 2;
    return valor;
    
}


function RatingCatalog({value}) {
    console.log(value);
    console.log(approximateToNewScale(value))
    console.log(transformToScale0To5(value))
    return (
        <Box
            width="100%"
            display={'flex'}
            alignItems={'center'}
        >
            <Rating
                name="hover-feedback"
                value={transformToScale0To5(value)}
                precision={0.5}
                getLabelText={getLabelText}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                readOnly
            />
            <Box sx={{ ml: 2 }}>
                {labels[approximateToNewScale(value)]}
            </Box>
        </Box>
    )
}

export default RatingCatalog