"use strict";
const React = require("react");
const { Text, Box, useInput, Newline, useApp } = require("ink");
const { useState, useEffect } = require("react");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const choices = require("./choices");

const App = () => {
	const { exit } = useApp();

	const [cur, setCur] = useState(0);
	
	const [R, setR] = useState(130)
	const [G, setG] = useState(0)
	const [B, setB] = useState(0)

	function startRedLoop() {
		return setInterval(() => {
			setR(prev => (prev + 3) % 255)
		}, 64);
	}
	
	function startBlueLoop() {
		return setInterval(() => {
			setB(prev => (prev + 5) % 255)
		}, 128);
	}

	function startGreenLoop() {
		return setInterval(() => {
			setB(prev => (prev + 7) % 255)
		}, 256);
	}

	useEffect(() => {
		const BlueLoop = startBlueLoop();
		const GreenLoop = startGreenLoop();
		const RedLoop = startRedLoop();
		
		return () => {
			clearInterval(BlueLoop)
			clearInterval(GreenLoop)
			clearInterval(RedLoop)
		}
	}, [])

	const numChoices = choices.length;

	function action(choice) {
		choices[choice].actor();
	}

	useInput((input, key) => {
		if (key.tab) {
			setCur((cur + 1) % numChoices);
		} else if (key.downArrow) {
			setCur((cur + 1) % numChoices);
		} else if (key.upArrow) {
			if (cur == 0) {
				setCur(numChoices - 1);
			} else {
				setCur((cur - 1) % numChoices);
			}
		} else if (key.return) {
			action(cur);
		} else if (input == "q") {
			exit();
		} else {
			const choice = parseInt(input);
			if (!isNaN(choice) && 0 <= choice && choice <= numChoices - 1) {
				setCur(choice);
			}
		}
	});

	return (
		<Box
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			width={"100%"}
			borderStyle="single"
			borderColor={`rgb(${R}, ${G}, ${B})`}
		>
			<Gradient name="fruit">
				<BigText text="👋 Hi! I'm D G Shivu" font="chrome" />
			</Gradient>
			<Box flexDirection="column">
				{choices.map((choice, i) => (
					<Text key={i}>
						{i}. {choice.name} {cur == i ? <Text>👈</Text> : ""}
					</Text>
				))}
			</Box>
		</Box>
	);
};

module.exports = App;
