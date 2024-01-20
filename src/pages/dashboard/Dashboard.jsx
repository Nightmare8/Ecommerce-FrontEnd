import {useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Box, Typography, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import EmailIcon from "@mui/icons-material/Email";
//Components
import LineChartComponent from '../../components/LineChart.jsx';
import PieChartComponent from '../../components/PieChart.jsx';
import LoadingEffect from '../../components/LoadingEffect.jsx';
//Routes
import { purchaseRoutes } from '../../api/config.js';
//Redux
import { useSelector } from 'react-redux';

const transformDataPie = (data) => {
  //Count the number of each seller
  let count = {};
  console.log(data);
  data.forEach((element) => {
    if (count[element.companySeller.nombre]) {
      count[element.companySeller.nombre] += 1;
    } else {
      count[element.companySeller.nombre] = 1;
    }
  });
  //Transform to array
  let array = [];
  for (let key in count) {
    array.push({ name: key, value: count[key] });
  }
  return array;
}

const transformDataLine = (data) => {
  //Obtain the value of each month
  let count = {};
  data.forEach((element) => {
    let date = new Date(element.fechaOrden);
    let month = date.getMonth();
    if (count[month]) {
      count[month] += element.total;
    } else {
      count[month] = element.total;
    }
  }) 
  //Transform to array
  let array = [];
  let monthEnum = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  //Complete whole monts with 0
  for (let i = 0; i < 12; i++) {
    if (count[i]) {
      array.push({ name: monthEnum[i], value: count[i] });
    } else {
      array.push({ name: monthEnum[i], value: 0 });
    }
  }
  console.log(array);
  return array; 
}


function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const styles = {
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary[400],
      borderRadius: '10px',
      padding: '1%',
    }
  }
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const url = purchaseRoutes.getPurchase + user.company;
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setData(data)
        })
        .catch((error) => console.log(error)).finally(() => setLoading(false));
}, [user.company])

  return (
    <Box
      paddingX={2}
      paddingY={2}
    >
      <Box
        display='flex'
        justifyContent={'space-between'}
        alignContent={'center'}
      >
        <Header title='Panel de control' subTitle='Bienvenido a tu panel de control' />
        <Box>
          <Button
            variant="contained"
            startIcon={<DownloadOutlinedIcon />}
            sx={{
              backgroundColor: theme.palette.button.main,
            }}
          >
            Download Reports
          </Button>
        </Box>
      </Box>
      {
        loading ? <LoadingEffect /> : 
        <Grid
          container
          sx={{
            marginTop: '2%',
            height: '80%',
          }}
          rowGap={1}
          columnGap={1}
        >
          {/* Row 1 */}
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={8}
            sx={styles.item}
          >
            <LineChartComponent data={transformDataLine(data)} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            sx={styles.item}
          >
            <PieChartComponent data={transformDataPie(data)} />
          </Grid>
        </Grid>
      }
    </Box>
  )
}

export default Dashboard