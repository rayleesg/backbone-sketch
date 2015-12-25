import $ from 'jquery';
import App from '../src/App';
import Backbone from 'backbone';

describe('App', () => {
    function initApp(cb) {
        const app = new App().init();
        setTimeout(() => {
            if (window.location.pathname === '/context.html') {
                Backbone.history.navigate('/', {trigger: true});
            }
            cb(app);
        }, 0);
    }

    describe('init', () => {
        it('should show the homepage by default', cb => {
            initApp(app => {
                app.appDiv.text().trim().should.equal('Homepage.');
                cb();
            });
        });
    });

    describe('navigate', () => {
        it('should be able to navigate to about page', cb => {
            initApp(app => {
                app.navigate('/about');
                app.appDiv.text().trim().should.equal('About page.');
                window.location.pathname.should.equal('/about');
                cb();
            });
        });
    });

    describe('hijackLinks', () => {
        it('should prevent local links from reloading the page', cb => {
            initApp(app => {
                app.navigate('/about');
                window.location.pathname.should.equal('/about');
                $('a.navbar-brand').click();
                window.location.pathname.should.equal('/');
                cb();
            });
        });
    });
});
