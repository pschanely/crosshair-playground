import React from 'react';
import {
  Button,
  ButtonDropdown,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';

class Header extends React.Component {
  state = {
    aboutIsOpen: false,
    navbarIsOpen: false,
    optionsIsOpen: false,
  };

  toggle(name) {
    const stateName = `${name}IsOpen`;
    this.setState({
      [stateName]: !this.state[stateName],
    });
  }

  render() {
    const {
      context,
      config,
      status,
      onGistClick,
      onRunClick,
      onConfigChange,
    } = this.props;

    const half = Math.ceil(context.flags.length / 2);
    const flagsColumns = [
      context.flags.slice(0, half),
      context.flags.slice(half, context.flags.length),
    ];

    return (
      <header>
        <Navbar dark expand="lg">
          <NavbarBrand href="/" className="h1 mb-0">
            <span> CrossHair Playground</span>
            <svg height={71} width={33} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <image
                xlinkHref="https://raw.githubusercontent.com/pschanely/CrossHair/master/doc/logo.png"
                height={71}
                width={33}
              />
            </svg>
          </NavbarBrand>
          <NavbarToggler onClick={() => this.toggle('navbar')} />
          <Collapse navbar isOpen={this.state.navbarIsOpen}>
            <Form inline className="my-2 my-lg-0 mr-auto">
              <Button color="light" size="sm" className="my-2 my-sm-0 mr-sm-2" id="run" disabled={status === 'running'} onClick={onRunClick}>Run</Button>
	      <ButtonDropdown className="my-2 my-sm-0 mr-sm-2" isOpen={this.state.examplesIsOpen} toggle={() => this.toggle('examples')}>
	        <DropdownToggle caret color="light" size="sm">
                  Examples
	        </DropdownToggle>
	        <DropdownMenu>
                  <DropdownItem tag="a" href="?gist=93f54161c4bda3a3bf93fe7f7d598d29">String slicing</DropdownItem>
                  <DropdownItem tag="a" href="?gist=344bc539abb164fe7acd3eb456f13295">Exception discovery</DropdownItem>
                  <DropdownItem tag="a" href="?gist=c242184656f086dc2d18d41dacec7df1">Hash consistent with equals</DropdownItem>
                </DropdownMenu>
	      </ButtonDropdown>
              <Button color="light" size="sm" className="my-sm-0 mr-sm-2" disabled={status === 'creating_gist'} onClick={onGistClick}>Gist</Button>
              <Input
                type="select"
		bsSize="sm"
                className="mr-sm-2"
                title="CrossHair Version"
                value={config.crosshairVersion}
                onChange={e => onConfigChange({ crosshairVersion: e.target.value })}
              >
                {
                  context.mypy_versions.map(([name, id]) => (
                    <option key={id} value={id}>{ name }</option>
                  ))
                }
              </Input>
              <Button color="light" size="sm" className="my-2 my-sm-0" data-toggle="modal" data-target="#options-modal" onClick={() => this.toggle('options')}>
                Options
              </Button>
            </Form>
            <Form className="form-inline my-2 my-lg-0">
              <Button color="light" size="sm" className="my-2 my-sm-0" data-toggle="modal" data-target="#about-modal" onClick={() => this.toggle('about')}>
                About
              </Button>
            </Form>
          </Collapse>
        </Navbar>
        <Modal size="lg" isOpen={this.state.optionsIsOpen} toggle={() => this.toggle('options')}>
          <ModalHeader toggle={() => this.toggle('options')}>
            Options
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                {
                  flagsColumns.map(flags => (
                    <Col md={6} key={flags[0]}>
                      {
                        flags.map(flag => (
                          <FormGroup check key={flag}>
                            <Input
                              type="checkbox"
                              id={flag}
                              checked={config[flag]}
                              onChange={e => onConfigChange({ [flag]: e.target.checked })}
                            />
                            <Label check for={flag}>
                              <code>--{ flag }</code>
                            </Label>
                          </FormGroup>
                        ))
                      }
                    </Col>
                  ))
                }
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle('options')}>Close</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.aboutIsOpen} toggle={() => this.toggle('about')}>
          <ModalHeader toggle={() => this.toggle('about')}>About the CrosHair Playground</ModalHeader>
          <ModalBody>
            <p>
              The CrossHair Playground is a web service that receives a Python program with type
              hints, runs <a href="https://github.com/pschanely/CrossHair">CrossHair</a> inside
              a sandbox, then returns the output.
            </p>
            <p>
              <span>This project is </span>
              <a href="https://github.com/pschanely/crosshair-playground">forked</a>
              <span> from, and nearly identical to </span>
              <a href="https://mypy-play.net/">mypy Playground</a>
              <span> by </span>
              <a href="https://www.ymyzk.com">Yusuke Miyazaki (@ymyzk)</a>.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle('about')}>Close</Button>
          </ModalFooter>
        </Modal>
      </header>
    );
  }
}

export default Header;
