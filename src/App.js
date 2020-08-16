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

const jsonDefaultValue = `{

}`

const getJsonInternal = (json) => {
	try {
		return [JSON.parse(json)]
	} catch (e) {
		return []
	}
}

const App = () => {
	const classes = useStyles()
	const [json, setJson] = useState('')
	const [csv, setCsv] = useState('')

	useEffect(() => {
		json2csvAsync(getJsonInternal(json))
			.then(csv => {
				setCsv(csv)
			})
	}, [json])

	useEffect(() => {
		setJson(jsonDefaultValue)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Grid container>
				<Grid item className={classes.editor}>
					<Editor mode='json'
									placeholder='JSON'
									onChange={newval => setJson(newval)}
									defaultValue={jsonDefaultValue}
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
