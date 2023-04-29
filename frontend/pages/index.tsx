import {useEffect, useState} from "react";
import {Button, createStyles, Grid, makeStyles, Typography} from "@material-ui/core";
import axios from "axios";
import {useFilePicker} from 'use-file-picker';


const useStyles = makeStyles(() =>
    createStyles({
        imm: {
            maxHeight: 500,
            maxWidth: 500,
            height: 'auto',
            width: 'auto',
        },
    }),
);

export default function Home() {
    const classes = useStyles();

    const [predictOutput, setPredictOutput] = useState([])

    const [openFileSelector, {filesContent, loading, errors}] = useFilePicker({
        multiple: false,
        readAs: 'DataURL',
        accept: ['.png', '.jpg'],
    });


    const strToArr = (str) => JSON.parse(str.replaceAll("'", "\""))

    const predict = (image) => {
        console.log(image.content.split(",")[1])
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/predict`, image.content.split(",")[1])
            .then((resp) => {
                setPredictOutput(strToArr(resp.data));
            }).catch((e) => {
            setPredictOutput([{class: "unable to predict", confidence:"" }]);
        });
    }

    useEffect(() => {
        if (filesContent?.[0]?.content) {
            predict(filesContent[0])
        }
    }, [filesContent])


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={9}>
                            <img src={filesContent[0]?.content} className={classes.imm}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="primary" variant="contained"
                                    onClick={() => openFileSelector()}>Open image</Button>
                            <Typography>{filesContent[0]?.name ?? "None"}</Typography>
                            <Typography>Predictions:</Typography>
                            {predictOutput.length === 0 ? <Typography>...</Typography> : null}
                            {predictOutput.map((p, i) => (<Typography key={i}>
                                    {`${i + 1}. ${p.class}, confidence: ${p.confidence}`}
                                </Typography>)
                            )}
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </>

    );
}
