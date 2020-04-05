import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as NRouter, Route as NRoute, Redirect as NRedirect, Switch as NSwitch } from 'react-router-dom';

export const Route = ({ location, path, component, onEnter, indexRedirectTo, children }) => {
    let Component = component, { pathname } = location;

    if (!!onEnter && !!onEnter()) return <NRoute render={() => onEnter()} />;

    if (indexRedirectTo && pathname === path) return <NRoute render={() => <NRedirect to={pathname === '/' ? indexRedirectTo : pathname + indexRedirectTo} />} />;

    if (!component) return <NSwitch>{React.cloneElement(children, { path: path + children.props.path, location })}</NSwitch>;

    return (
        <NRoute path={path} render={(props) => (<Component {...props}>
            {children && <NSwitch>
                {children.length ? children.map(child => {
                    if (!!child.props.children && !!child.props.children.length) {
                        return React.cloneElement(child, { key: path + child.props.path, children: child.props.children.map(gchild => React.cloneElement(gchild, { path: child.props.path + gchild.props.path, key: child.props.path + gchild.props.path })) });
                    }
                    return child;
                }) : React.cloneElement(children, { path: path + children.props.path, location })}
            </NSwitch>}
        </Component>)} />
    )
};

Route.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func,
    onEnter: PropTypes.func,
    indexRedirectTo: PropTypes.string,
};

export const Redirect = NRedirect;
export const Router = ({ children }) => <NRouter><NSwitch>{children}</NSwitch></NRouter>;