import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import JsonIcon from "../modules/icon/JsonIcon";
import TextField from '@mui/material/TextField';
import axios from "axios";
import { saveAs } from 'file-saver'

const theme = createTheme();

export default function Main() {

    const [pointNum, setPointNum] = React.useState(1);

    const handleChange = (evt) => {
        //console.debug(evt.target.value);
        setPointNum(evt.target.value);
    }

    const handleClick = async () => {
        let params = new URLSearchParams();
        params.append("pointNum", pointNum);

        const res = await axios
            .post("/service/makeGeoJSON.php", params)
            .catch((err) => {
                return err.response;
            });
        if (res.status != 200) {
            // 例外発生時の処理
            console.log("例外発生時の処理");
        } else {
            if (res.data.status === "error") {
                // エラー表示

            } else {
                console.debug(res.data);
                let data = JSON.stringify(res.data);
//                    chibanList.map((row, index) => ( data = data + row.address_chiban + "\n" ));
                //BOMを付与する（Excelでの文字化け対策）
                const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
                const blob = new Blob([bom, data], { type: "text/csv" });
                //ダウンロード
                saveAs(blob, `${pointNum}.geojson`);

            }
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <JsonIcon sx={{ mr: 2 }}  />
                    <Typography variant="h6" color="inherit" noWrap>
                        GeoJSON Maker
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        pt: 4,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="md">

                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            GeoJSONファイルを生成します。<br/>ジオメトリタイプはポイントのみ。
                        </Typography>

                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <TextField
                                required
                                type="number"
                                id="outlined-name"
                                label="ポイント数"
                               value={pointNum}
                               onChange={handleChange}
                                size="small"
                            />

                            <Button variant="contained" onClick={handleClick} >make</Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
            {/* End footer */}
        </ThemeProvider>
    );
}
