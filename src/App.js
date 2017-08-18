import React, { Component } from 'react'
import Card, { CardActions, CardHeader, CardContent, CardMedia } from 'material-ui/Card'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <Grid container justify='center' className="App">
        <Grid item xs={12} sm={6}>
          <Card style={{ width: '100%' }}>
            <CardHeader
              subheader='平成29年度 > 判別'
              style={{ paddingTop: 5, paddingBottom: 5 }}
            />
            <img src="http://www.chusankan.net/blog/jimu/archives/assets_c/2009/10/middle_1239343266[1]-thumb-300x264-1840.jpg" alt=""/>
            <CardContent>
              これは何
            </CardContent>
            <List>
              <ListItem button dense>
                <ListItemText primary="コジュケイ" />
              </ListItem>
              <ListItem button dense>
                <ListItemText primary="ムクドリ" />
              </ListItem>
              <ListItem button dense>
                <ListItemText primary="ヨシガモ" />
              </ListItem>
              <ListItem button dense>
                <ListItemText primary="ヒクイナ" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default App