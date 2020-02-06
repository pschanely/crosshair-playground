import React from 'react';
import {
  Button,
  Col,
  Collapse,
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
          <NavbarBrand href="/" className="h1 mb-0">CrossHair Playground</NavbarBrand>
          <NavbarToggler onClick={() => this.toggle('navbar')} />
          <Collapse navbar isOpen={this.state.navbarIsOpen}>
            <Form inline className="my-2 my-lg-0 mr-auto">
              <Button color="light" className="my-2 my-sm-0 mr-sm-2" id="run" disabled={status === 'running'} onClick={onRunClick}>Run</Button>
              <Button color="light" className="my-sm-0 mr-sm-2" disabled={status === 'creating_gist'} onClick={onGistClick}>Gist</Button>
              <Input
                type="select"
                className="mr-sm-2"
                title="mypy Version"
                value={config.mypyVersion}
                onChange={e => onConfigChange({ mypyVersion: e.target.value })}
              >
                {
                  context.mypy_versions.map(([name, id]) => (
                    <option key={id} value={id}>{ name }</option>
                  ))
                }
              </Input>
              <Button color="light" className="my-2 my-sm-0" data-toggle="modal" data-target="#options-modal" onClick={() => this.toggle('options')}>
                Options
              </Button>
            </Form>
            <Form className="form-inline my-2 my-lg-0">
              <Button color="light" className="my-2 my-sm-0" data-toggle="modal" data-target="#about-modal" onClick={() => this.toggle('about')}>
                About
              </Button>
            </Form>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.optionsIsOpen} toggle={() => this.toggle('options')}>
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
              This project is
              <a href="https://github.com/pschanely/crosshair-playground">forked</a> from,
              and nearly identical to
              <a href="https://mypy-play.net/">mypy Playground</a> by
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
