import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { ProductModal } from "./";

const useStyles = makeStyles({
	root: {
		maxWidth: 500,
	},
	media: {
		height: 200,
		objectFit: "cover",
	},
});

export default function ProductCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={props.image}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Rp. {props.price}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<ProductModal id={props.id} />
			</CardActions>
		</Card>
	);
}
