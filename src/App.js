import React, { useEffect, useState } from 'react'
import { json2csvAsync } from 'json-2-csv'

import { makeStyles } from '@material-ui/core/styles'
import { Editor } from './components/Editor/Editor'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles(() => ({
	editor: {
		width: 500,
		height: 600,
	},
}))

const getJsonInternal = (json) => {
	try {
		return [JSON.parse(json)]
	} catch (e) {
		return undefined
	}
}

const App = () => {
	const classes = useStyles()
	const [json, setJson] = useState('')
	const [csv, setCsv] = useState('')

	useEffect(() => {
		json2csvAsync(getJsonInternal(json))
			.then(csv => {
				console.log({csv})
				setCsv(csv)
			})
			.catch(e => {
				console.log('invalid json')
			})
	}, [json])

	return (
		<>
			<Grid container>
				<Grid item className={classes.editor}>
					<Editor mode='json'
									placeholder='JSON'
									onChange={newval => setJson(newval)}
									value={json}
					/>
				</Grid>
				<Grid item className={classes.editor}>
					<Editor value={csv}
									placeholder='CSV'
					/>
				</Grid>
			</Grid>
		</>
	)
}


export default App
