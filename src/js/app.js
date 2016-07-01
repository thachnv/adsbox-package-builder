import '../../bower_components/bootstrap/dist/css/bootstrap.css';
import '!script!../../bower_components/jquery/dist/jquery.js';
import '!script!../../bower_components/bootstrap/dist/js/bootstrap.js';
import '!script!../../bower_components/notifyjs/dist/notify.js';
import '../../bower_components/fabric.js/dist/fabric.js';
import '../less/app.less';
import '../index.html';
import '../assets/video-player.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import TemplateBuilderApp from './components/TemplateBuilderApp/TemplateBuilderApp.js';

ReactDOM.render(<TemplateBuilderApp />, document.getElementById('app'));
