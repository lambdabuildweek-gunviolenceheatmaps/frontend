import PropTypes from 'prop-types';
import axios from 'axios';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

import HeatMap from "../HeatMap/HeatMap";

import '../../App.css';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const src1 = "https://cdn-images-1.medium.com/max/1200/0*a_4llBIWbEeO9ML5.png";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Gun Violence in America'
      inverted
      style={{
        fontSize: mobile ? '2em' : '5em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '0.25em',
      }}
    />
    <Header
      as='h2'
      content="Stay educated. Stay Safe."
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '2.0em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.0em',
      }}
    />
    <Image src={src1} size="huge" centered />
    <Button 
        primary size='huge'
        style={{
            marginTop: mobile ? '1.5em' : '1.0em',
          }}
    >
      Interactive Heat Maps
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '2em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='huge'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>About Us</Menu.Item>
                <Menu.Item as='a'>Data Visualizations</Menu.Item>
                <Menu.Item as='a'>Heat Map</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class Home extends Component {
    state = {
        data: {},
        coordinates:
          [
            [51.359296, 0.00118],
            [51.606675, 0.984749],
            [51.431413, 0.124869],
            [51.184951, 0.859696],
            [51.069935, 0.580372],
            [51.960397, 0.421541],
            [51.004212, 0.322956],
            [51.889196, 0.262709],
            [51.058981, 0.13674],
            [51.053504, 0.01077],
            [51.141136, -1.840985],
            [51.042551, -1.539753],
            [51.113751, -1.27686],
            [51.004212, -1.003013],
            [51.497137, 0.997536],
            [53.600282, 0.997536],
            [53.633143, 0.86609],
            [53.408589, 0.674397],
            [53.446927, 0.510088],
            [53.37025, 0.427934],
            [53.518128, 0.280057],
            [53.655051, 0.247195],
            [53.90699, 0.411504],
            [53.934375, 0.657966],
            [53.011052, 0.685351],
            [54.10416, 0.499135],
            [54.137022, 0.318396],
            [54.394438, 0.367688],
            [54.471115, -1.895754],
            [54.241084, -3.796253],
            [54.098683, -4.891641],
            [54.202745, -4.995703],
            [54.359296, -5.00118]
          ]
    }

    componentDidMount() {
        console.log("CDM inside of <Home/> : ", this.state.coordinates);

        axios
        .get('https://dbase.wtf/api/gundata/478855')
        .then(res => {
          // console.log(res);
          this.setState({ 
              data: res.data,
              latlng: [res.data.latitude, res.data.longitude],
            });
        })
        .catch(err => {
          // console.log(err);
          this.setState({ error: err });
        });
    }

    render() {
        return(
            <ResponsiveContainer>
                <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                    <Grid.Column width={16}>
                        <Header as='h3' style={{ fontSize: '4em' }}>
                            Interactive Gun Violence Heat Map
                        </Header>
                        {this.state.data ? 
                        <HeatMap 
                            coordinates={this.state.coordinates}
                            data={this.state.data} 
                            latlng={this.state.latlng}
                            id="heatmap"
                        /> : null}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Column textAlign='center'>
                            <Header as='h3' style={{ fontSize: '4em' }}>
                                Articles on Gun Violence
                            </Header>
                        </Grid.Column>
                        <Grid.Row textAlign='center'>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                            "What a Company"
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                            "I shouldn't have gone with their competitor."
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                            <Image avatar src='/images/avatar/large/nan.jpg' />
                            <b>Nan</b> Chief Fun Officer Acme Toys
                            </p>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                    Breaking The Grid, Grabs Your Attention
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    Instead of focusing on content creation and hard work, we have learned how to master the
                    art of doing nothing by providing massive amounts of whitespace and generic content that
                    can seem massive, monolithic and worth your attention.
                    </p>
                    <Button as='a' size='large'>
                    Read More
                    </Button>
                    <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                    >
                    <a href='https://www.lambdaschool.com'>Case Studies</a>
                    </Divider>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                    Did We Tell You About Our Bananas?
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                    it's really true. It took years of gene splicing and combinatory DNA research, but our
                    bananas can really dance.
                    </p>
                    <Button as='a' size='large'>
                    I'm Still Quite Interested
                    </Button>
                </Container>
                </Segment>
                <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as='a'>Sitemap</List.Item>
                            <List.Item as='a'>Contact Us</List.Item>
                            <List.Item as='a'>Religious Ceremonies</List.Item>
                            <List.Item as='a'>Gazebo Plans</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='Services' />
                        <List link inverted>
                            <List.Item as='a'>Banana Pre-Order</List.Item>
                            <List.Item as='a'>DNA FAQ</List.Item>
                            <List.Item as='a'>How To Access</List.Item>
                            <List.Item as='a'>Favorite X-Men</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                        <Header as='h4' inverted>
                            Footer Header
                        </Header>
                        <p>
                            Extra space for a call to action inside the footer that could help re-engage users.
                        </p>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
                </Segment>
            </ResponsiveContainer>
        )
    }
  
}

export default Home;