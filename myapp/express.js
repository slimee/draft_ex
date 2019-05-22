export default () => {
    //Instantiate express
    var app = express();

//process.stdin.resume();


// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors());

//Call all routers here
//app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/api/contactus', contactUsRouter);

// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

// error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        console.log('Error status: ', err.status);
        console.log('Error message: ', err.message);
        res.render('error');
    });

    return app
}