var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @fileoverview added by tsickle
 * Generated from: FormioBaseComponent.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ElementRef, EventEmitter, Input, NgZone, Optional, Output, ViewChild } from '@angular/core';
import { FormioService } from './formio.service';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAppConfig } from './formio.config';
import { assign, get, isEmpty } from 'lodash';
import { CustomTagsService } from './custom-component/custom-tags.service';
import Evaluator from 'formiojs/utils/Evaluator';
import { AlertsPosition } from './types/alerts-position';
var FormioBaseComponent = /** @class */ (function () {
    function FormioBaseComponent(ngZone, config, customTags) {
        var _this = this;
        this.ngZone = ngZone;
        this.config = config;
        this.customTags = customTags;
        this.submission = {};
        this.noeval = false;
        this.readOnly = false;
        this.viewOnly = false;
        this.hooks = {};
        this.watchSubmissionErrors = false;
        this.render = new EventEmitter();
        this.customEvent = new EventEmitter();
        this.fileUploadingStatus = new EventEmitter();
        this.submit = new EventEmitter();
        this.prevPage = new EventEmitter();
        this.nextPage = new EventEmitter();
        this.beforeSubmit = new EventEmitter();
        this.change = new EventEmitter();
        this.invalid = new EventEmitter();
        this.errorChange = new EventEmitter();
        this.formLoad = new EventEmitter();
        this.submissionLoad = new EventEmitter();
        this.ready = new EventEmitter();
        this.AlertsPosition = AlertsPosition;
        this.initialized = false;
        this.alerts = new FormioAlerts();
        this.submitting = false;
        this.submissionSuccess = false;
        this.isLoading = true;
        this.formioReady = new Promise((/**
         * @param {?} ready
         * @return {?}
         */
        function (ready) {
            _this.formioReadyResolve = ready;
        }));
    }
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.getRenderer = /**
     * @return {?}
     */
    function () {
        return this.renderer;
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.getRendererOptions = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var extraTags = this.customTags ? this.customTags.tags : [];
        return assign({}, {
            icons: get(this.config, 'icons', 'fontawesome'),
            noAlerts: get(this.options, 'noAlerts', true),
            readOnly: this.readOnly,
            viewAsHtml: this.viewOnly,
            i18n: get(this.options, 'i18n', null),
            fileService: get(this.options, 'fileService', null),
            hooks: this.hooks,
            sanitizeConfig: {
                addTags: extraTags
            }
        }, this.renderOptions || {});
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.createRenderer = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var Renderer = this.getRenderer();
        /** @type {?} */
        var form = (new Renderer(this.formioElement ? this.formioElement.nativeElement : null, this.form, this.getRendererOptions()));
        return form.instance;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FormioBaseComponent.prototype.setForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        this.form = form;
        if (this.formio) {
            this.formio.destroy();
        }
        // Clear out the element to render the new form.
        if (this.formioElement && this.formioElement.nativeElement) {
            this.formioElement.nativeElement.innerHTML = '';
        }
        this.formio = this.createRenderer();
        this.formio.submission = this.submission;
        if (this.renderOptions && this.renderOptions.validateOnInit) {
            this.formio.setValue(this.submission, { validateOnInit: true });
        }
        if (this.url) {
            this.formio.setUrl(this.url, this.formioOptions || {});
        }
        if (this.src) {
            this.formio.setUrl(this.src, this.formioOptions || {});
        }
        this.formio.nosubmit = true;
        this.formio.on('prevPage', (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onPrevPage(data); })); }));
        this.formio.on('nextPage', (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onNextPage(data); })); }));
        this.formio.on('change', (/**
         * @param {?} value
         * @param {?} flags
         * @param {?} isModified
         * @return {?}
         */
        function (value, flags, isModified) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onChange(value, flags, isModified); })); }));
        this.formio.on('customEvent', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.customEvent.emit(event); }));
        }));
        ['fileUploadingStart', 'fileUploadingEnd'].forEach((/**
         * @param {?} eventName
         * @param {?} index
         * @return {?}
         */
        function (eventName, index) {
            /** @type {?} */
            var status = !!index ? 'end' : 'start';
            _this.formio.on(eventName, (/**
             * @return {?}
             */
            function () {
                return _this.ngZone.run((/**
                 * @return {?}
                 */
                function () { return _this.fileUploadingStatus.emit(status); }));
            }));
        }));
        this.formio.on('submit', (/**
         * @param {?} submission
         * @param {?} saved
         * @return {?}
         */
        function (submission, saved) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.submitForm(submission, saved); }));
        }));
        this.formio.on('error', (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () {
            _this.submissionSuccess = false;
            return _this.onError(err);
        })); }));
        this.formio.on('render', (/**
         * @return {?}
         */
        function () { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.render.emit(); })); }));
        this.formio.on('formLoad', (/**
         * @param {?} loadedForm
         * @return {?}
         */
        function (loadedForm) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.formLoad.emit(loadedForm); }));
        }));
        return this.formio.ready.then((/**
         * @return {?}
         */
        function () {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.isLoading = false;
                _this.ready.emit(_this);
                _this.formioReadyResolve(_this.formio);
                if (_this.formio.submissionReady) {
                    _this.formio.submissionReady.then((/**
                     * @param {?} submission
                     * @return {?}
                     */
                    function (submission) {
                        _this.submissionLoad.emit(submission);
                    }));
                }
            }));
            return _this.formio;
        }));
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.initialize = /**
     * @return {?}
     */
    function () {
        if (this.initialized) {
            return;
        }
        /** @type {?} */
        var extraTags = this.customTags ? this.customTags.tags : [];
        /** @type {?} */
        var defaultOptions = {
            errors: {
                message: 'Please fix the following errors before submitting.'
            },
            alerts: {
                submitMessage: 'Submission Complete.'
            },
            disableAlerts: false,
            hooks: {
                beforeSubmit: null
            },
            sanitizeConfig: {
                addTags: extraTags
            },
            alertsPosition: AlertsPosition.top,
        };
        this.options = Object.assign(defaultOptions, this.options);
        if (this.options.disableAlerts) {
            this.options.alertsPosition = AlertsPosition.none;
        }
        this.initialized = true;
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (this.language) {
            if (typeof this.language === 'string') {
                this.formio.language = this.language;
            }
            else {
                this.language.subscribe((/**
                 * @param {?} lang
                 * @return {?}
                 */
                function (lang) {
                    _this.formio.language = lang;
                }));
            }
        }
        if (this.refresh) {
            this.refresh.subscribe((/**
             * @param {?} refresh
             * @return {?}
             */
            function (refresh) {
                return _this.onRefresh(refresh);
            }));
        }
        if (this.error) {
            this.error.subscribe((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        if (this.success) {
            this.success.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                _this.alerts.setAlert({
                    type: 'success',
                    message: message || get(_this.options, 'alerts.submitMessage')
                });
            }));
        }
        if (this.src) {
            if (!this.service) {
                this.service = new FormioService(this.src);
            }
            this.isLoading = true;
            this.service.loadForm({ params: { live: 1 } }).subscribe((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                if (form && form.components) {
                    _this.ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    function () {
                        _this.setForm(form);
                    }));
                }
                // if a submission is also provided.
                if (isEmpty(_this.submission) &&
                    _this.service &&
                    _this.service.formio.submissionId) {
                    _this.service.loadSubmission().subscribe((/**
                     * @param {?} submission
                     * @return {?}
                     */
                    function (submission) {
                        if (_this.readOnly) {
                            _this.formio.options.readOnly = true;
                        }
                        _this.submission = _this.formio.submission = submission;
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) { return _this.onError(err); }));
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        if (this.url && !this.service) {
            this.service = new FormioService(this.url);
        }
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formio) {
            this.formio.destroy();
        }
    };
    /**
     * @param {?} refresh
     * @return {?}
     */
    FormioBaseComponent.prototype.onRefresh = /**
     * @param {?} refresh
     * @return {?}
     */
    function (refresh) {
        var _this = this;
        this.formioReady.then((/**
         * @return {?}
         */
        function () {
            if (refresh.form) {
                _this.formio.setForm(refresh.form).then((/**
                 * @return {?}
                 */
                function () {
                    if (refresh.submission) {
                        _this.formio.setSubmission(refresh.submission);
                    }
                }));
            }
            else if (refresh.submission) {
                _this.formio.setSubmission(refresh.submission);
            }
            else {
                switch (refresh.property) {
                    case 'submission':
                        _this.formio.submission = refresh.value;
                        break;
                    case 'form':
                        _this.formio.form = refresh.value;
                        break;
                }
            }
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (changes.form && changes.form.currentValue) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.setForm(changes.form.currentValue);
            }));
        }
        this.formioReady.then((/**
         * @return {?}
         */
        function () {
            if (changes.submission && changes.submission.currentValue) {
                _this.formio.setSubmission(changes.submission.currentValue, {
                    fromSubmission: false,
                });
            }
            if (changes.hideComponents && changes.hideComponents.currentValue) {
                /** @type {?} */
                var hiddenComponents_1 = changes.hideComponents.currentValue;
                _this.formio.options.hide = hiddenComponents_1;
                _this.formio.everyComponent((/**
                 * @param {?} component
                 * @return {?}
                 */
                function (component) {
                    component.options.hide = hiddenComponents_1;
                    if (hiddenComponents_1.includes(component.component.key)) {
                        component.visible = false;
                    }
                }));
            }
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    FormioBaseComponent.prototype.onPrevPage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    FormioBaseComponent.prototype.onNextPage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data);
    };
    /**
     * @param {?} submission
     * @param {?} saved
     * @param {?=} noemit
     * @return {?}
     */
    FormioBaseComponent.prototype.onSubmit = /**
     * @param {?} submission
     * @param {?} saved
     * @param {?=} noemit
     * @return {?}
     */
    function (submission, saved, noemit) {
        this.submitting = false;
        this.submissionSuccess = true;
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        if (!noemit) {
            this.submit.emit(submission);
        }
        if (!this.success) {
            this.alerts.setAlert({
                type: 'success',
                message: get(this.options, 'alerts.submitMessage')
            });
        }
    };
    /**
     * @param {?} err
     * @return {?}
     */
    FormioBaseComponent.prototype.onError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        var _this = this;
        this.alerts.setAlerts([]);
        this.submitting = false;
        this.isLoading = false;
        if (!err) {
            return;
        }
        // Make sure it is an array.
        /** @type {?} */
        var errors = Array.isArray(err) ? err : [err];
        // Emit these errors again.
        this.errorChange.emit(errors);
        if (err.silent) {
            return;
        }
        if (this.formio && errors.length) {
            this.formio.emit('submitError', errors);
        }
        // Iterate through each one and set the alerts array.
        errors.forEach((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            var _a = error
                ? error.details
                    ? {
                        message: error.details.map((/**
                         * @param {?} detail
                         * @return {?}
                         */
                        function (detail) { return detail.message; })),
                        paths: error.details.map((/**
                         * @param {?} detail
                         * @return {?}
                         */
                        function (detail) { return detail.path; })),
                    }
                    : {
                        message: error.message || error.toString(),
                        paths: error.path ? [error.path] : [],
                    }
                : {
                    message: '',
                    paths: [],
                }, message = _a.message, paths = _a.paths;
            /** @type {?} */
            var shouldErrorDisplay = true;
            if (_this.formio) {
                paths.forEach((/**
                 * @param {?} path
                 * @param {?} index
                 * @return {?}
                 */
                function (path, index) {
                    /** @type {?} */
                    var component = _this.formio.getComponent(path);
                    if (component) {
                        /** @type {?} */
                        var components = Array.isArray(component) ? component : [component];
                        /** @type {?} */
                        var messageText_1 = Array.isArray(message) ? message[index] : message;
                        components.forEach((/**
                         * @param {?} comp
                         * @return {?}
                         */
                        function (comp) { return comp.setCustomValidity(messageText_1, true); }));
                        _this.alerts.addAlert({
                            type: 'danger',
                            message: message[index],
                            component: component,
                        });
                        shouldErrorDisplay = false;
                    }
                }));
                if (((/** @type {?} */ (window))).VPAT_ENABLED) {
                    if (typeof error === 'string' && _this.formio.components) {
                        _this.formio.components.forEach((/**
                         * @param {?} comp
                         * @return {?}
                         */
                        function (comp) {
                            if (comp && comp.type !== 'button') {
                                comp.setCustomValidity(message, true);
                            }
                        }));
                    }
                }
                if (!_this.noAlerts) {
                    _this.formio.showErrors();
                }
            }
            if (shouldErrorDisplay) {
                _this.alerts.addAlert({
                    type: 'danger',
                    message: message,
                    component: error.component,
                });
            }
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    FormioBaseComponent.prototype.focusOnComponet = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.formio) {
            this.formio.focusOnComponent(key);
        }
    };
    /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    FormioBaseComponent.prototype.submitExecute = /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    function (submission, saved) {
        var _this = this;
        if (saved === void 0) { saved = false; }
        if (this.service && !this.url && !saved) {
            this.service
                .saveSubmission(submission)
                .subscribe((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return _this.onSubmit(sub, true); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        else {
            this.onSubmit(submission, false);
        }
    };
    /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    FormioBaseComponent.prototype.submitForm = /**
     * @param {?} submission
     * @param {?=} saved
     * @return {?}
     */
    function (submission, saved) {
        var _this = this;
        if (saved === void 0) { saved = false; }
        // Keep double submits from occurring...
        if (this.submitting) {
            return;
        }
        this.submissionSuccess = false;
        this.submitting = true;
        this.beforeSubmit.emit(submission);
        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        /** @type {?} */
        var beforeSubmit = get(this.options, 'hooks.beforeSubmit');
        if (beforeSubmit) {
            beforeSubmit(submission, (/**
             * @param {?} err
             * @param {?} sub
             * @return {?}
             */
            function (err, sub) {
                if (err) {
                    _this.onError(err);
                    return;
                }
                _this.submitExecute(sub, saved);
            }));
        }
        else {
            this.submitExecute(submission, saved);
        }
    };
    /**
     * @param {?} value
     * @param {?} flags
     * @param {?} isModified
     * @return {?}
     */
    FormioBaseComponent.prototype.onChange = /**
     * @param {?} value
     * @param {?} flags
     * @param {?} isModified
     * @return {?}
     */
    function (value, flags, isModified) {
        if (this.watchSubmissionErrors && !this.submissionSuccess) {
            /** @type {?} */
            var errors = get(this, 'formio.errors', []);
            /** @type {?} */
            var alerts = get(this, 'alerts.alerts', []);
            /** @type {?} */
            var submitted = get(this, 'formio.submitted', false);
            if (submitted && (errors.length || alerts.length)) {
                this.onError(errors);
            }
        }
        return this.change.emit(__assign(__assign({}, value), { flags: flags, isModified: isModified }));
    };
    /** @nocollapse */
    FormioBaseComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: FormioAppConfig, decorators: [{ type: Optional }] },
        { type: CustomTagsService, decorators: [{ type: Optional }] }
    ]; };
    FormioBaseComponent.propDecorators = {
        form: [{ type: Input }],
        submission: [{ type: Input }],
        src: [{ type: Input }],
        url: [{ type: Input }],
        service: [{ type: Input }],
        options: [{ type: Input }],
        noeval: [{ type: Input }],
        formioOptions: [{ type: Input }],
        renderOptions: [{ type: Input }],
        readOnly: [{ type: Input }],
        viewOnly: [{ type: Input }],
        hideComponents: [{ type: Input }],
        refresh: [{ type: Input }],
        error: [{ type: Input }],
        success: [{ type: Input }],
        language: [{ type: Input }],
        hooks: [{ type: Input }],
        renderer: [{ type: Input }],
        watchSubmissionErrors: [{ type: Input }],
        render: [{ type: Output }],
        customEvent: [{ type: Output }],
        fileUploadingStatus: [{ type: Output }],
        submit: [{ type: Output }],
        prevPage: [{ type: Output }],
        nextPage: [{ type: Output }],
        beforeSubmit: [{ type: Output }],
        change: [{ type: Output }],
        invalid: [{ type: Output }],
        errorChange: [{ type: Output }],
        formLoad: [{ type: Output }],
        submissionLoad: [{ type: Output }],
        ready: [{ type: Output }],
        formioElement: [{ type: ViewChild, args: ['formio', { static: true },] }]
    };
    return FormioBaseComponent;
}());
export { FormioBaseComponent };
if (false) {
    /** @type {?} */
    FormioBaseComponent.prototype.form;
    /** @type {?} */
    FormioBaseComponent.prototype.submission;
    /** @type {?} */
    FormioBaseComponent.prototype.src;
    /** @type {?} */
    FormioBaseComponent.prototype.url;
    /** @type {?} */
    FormioBaseComponent.prototype.service;
    /** @type {?} */
    FormioBaseComponent.prototype.options;
    /** @type {?} */
    FormioBaseComponent.prototype.noeval;
    /** @type {?} */
    FormioBaseComponent.prototype.formioOptions;
    /** @type {?} */
    FormioBaseComponent.prototype.renderOptions;
    /** @type {?} */
    FormioBaseComponent.prototype.readOnly;
    /** @type {?} */
    FormioBaseComponent.prototype.viewOnly;
    /** @type {?} */
    FormioBaseComponent.prototype.hideComponents;
    /** @type {?} */
    FormioBaseComponent.prototype.refresh;
    /** @type {?} */
    FormioBaseComponent.prototype.error;
    /** @type {?} */
    FormioBaseComponent.prototype.success;
    /** @type {?} */
    FormioBaseComponent.prototype.language;
    /** @type {?} */
    FormioBaseComponent.prototype.hooks;
    /** @type {?} */
    FormioBaseComponent.prototype.renderer;
    /** @type {?} */
    FormioBaseComponent.prototype.watchSubmissionErrors;
    /** @type {?} */
    FormioBaseComponent.prototype.render;
    /** @type {?} */
    FormioBaseComponent.prototype.customEvent;
    /** @type {?} */
    FormioBaseComponent.prototype.fileUploadingStatus;
    /** @type {?} */
    FormioBaseComponent.prototype.submit;
    /** @type {?} */
    FormioBaseComponent.prototype.prevPage;
    /** @type {?} */
    FormioBaseComponent.prototype.nextPage;
    /** @type {?} */
    FormioBaseComponent.prototype.beforeSubmit;
    /** @type {?} */
    FormioBaseComponent.prototype.change;
    /** @type {?} */
    FormioBaseComponent.prototype.invalid;
    /** @type {?} */
    FormioBaseComponent.prototype.errorChange;
    /** @type {?} */
    FormioBaseComponent.prototype.formLoad;
    /** @type {?} */
    FormioBaseComponent.prototype.submissionLoad;
    /** @type {?} */
    FormioBaseComponent.prototype.ready;
    /** @type {?} */
    FormioBaseComponent.prototype.formioElement;
    /** @type {?} */
    FormioBaseComponent.prototype.AlertsPosition;
    /** @type {?} */
    FormioBaseComponent.prototype.formio;
    /** @type {?} */
    FormioBaseComponent.prototype.initialized;
    /** @type {?} */
    FormioBaseComponent.prototype.alerts;
    /** @type {?} */
    FormioBaseComponent.prototype.formioReady;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.formioReadyResolve;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.submitting;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.submissionSuccess;
    /** @type {?} */
    FormioBaseComponent.prototype.isLoading;
    /** @type {?} */
    FormioBaseComponent.prototype.noAlerts;
    /** @type {?} */
    FormioBaseComponent.prototype.ngZone;
    /** @type {?} */
    FormioBaseComponent.prototype.config;
    /** @type {?} */
    FormioBaseComponent.prototype.customTags;
}
