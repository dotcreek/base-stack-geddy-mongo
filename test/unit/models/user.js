describe('User Model', function() {

    describe('Defaults', function() {
        CustomTest.modelDefaults('User', [

            {
                name: 'username',
                datatype: 'string',
                required: true
            },

            {
                name: 'password',
                datatype: 'string',
                required: true
            },

            {
                name: 'token',
                datatype: 'string',
            },

            {
                name: 'tokenExpiration',
                datatype: 'date',
            },

        ]);
    });

    describe('Custom Validations', function() {
        beforeEach(function(done) {
            this.model = geddy.model.User.create();
            done();
        });

        it('should be invalid with username length less than 4', function() {
            this.model.updateAttributes({
                username: 'foo'
            });
            expect(this.model.isValid()).to.be.equal(false);
        });

        it('should be invalid with username length more than 30', function() {
            this.model.updateAttributes({
                username: 'This is a long username example..'
            });
            expect(this.model.isValid()).to.be.equal(false);
        });
    });

    CustomTest.modelValidations('User', ['name', 'password', 'username']);

    var inf = {
        password: '1234560',
        username: 'foobar'
    };

    CustomTest.validModel('User', inf);
});