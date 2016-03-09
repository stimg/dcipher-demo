/**
 * Created by zerkalenkov on 05.08.15.
 */

(function (window, document) {

    var Strings = {

        en: {

            _Recording: 'Recording',
            _Clicks: 'Clicks',
            _Wheels: 'Wheels',
            _Drags: 'Drags',
            _Events: 'Events',
            _Type: 'Type',
            _Time: 'Time',
            _Mouse_miles: 'Mouse miles',
            _Distance: "Distance",
            _Path: 'Path',
            _from: 'from',
            _Target: 'Target',
            _Action: 'Action',
            _No_name: 'No name',
            _Anonym: 'Anonym',
            _Record_session: 'Record session',
            _Show_records: 'Show session list',
            _Name_placeholder: 'Enter name',
            _Toggle_record: 'Show / hide session',
            _Delete_record: 'Delete session',
            _Play_record: 'Simulate session',
            _Change_color: 'Change color',
            _Event: 'Event',
            _Event_list: 'Events list',
            _Session: 'Session',
            _Session_name: 'Session',
            _Created: 'Created',
            _Modified: 'Modified',
            _Author: 'Author',
            _Duration: 'Duration',
            _Relative_mouse_speed: 'Relative mouse speed',
            _Miles_sec: 'Distance / sec',
            _Events_sec: 'Events / sec',
            _Clicks_sec: 'Clicks / sec',
            _KPI: "KPI power",
            _KPI_event: "KPI Event",
            _Start_test: "Start test",
            _Default_record_name: "Test #",
            _Test_done: "<span>✓</span>Congratulation! You have succesfully complete the test.",
            _No_active_record: "No active record",
            _Test_name: 'Test',
            _Task_description: 'Task',
            _Test_list: 'Test list',
            _Delete_test: 'Delete test',

            start: 'Start',
            mouseover: 'Mouse over',
            mouseout: 'Mouse out',
            mousedown: 'Mouse down',
            mousemove: 'Mouse move',
            mouseup: 'Mouse up',
            drag: 'Drag',
            click: 'Click',
            dblclick: 'Double click',
            keydown: 'Key down',
            wheel: 'Wheel',
            mousewheel: 'Wheel',
            DOMMouseScroll: 'Wheel',
            sec: 'sec',
            mc: 'mc',
            evs: 'evs',
            mm: 'mm',
            mp: 'mp',
            kpi: 'kpi',
            cds: 'cds'
        },

        ru: {},

        de: {}

    };

    // Indexed DB class
    var IDB = function () {

        this.dbName = 'dCipherDB';
        this.tables = {

            'sessions': 'sessions'

        };
        this.records = [];
        this.taskEvents = [
            {
                id: '0-1-0',
                taskId: '0-1',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-2-0-1-2-1-0-0-0",
                target: {tagName: "A"},
                location: '/bugaboo/A/index.html',
                done: false
            },
            {
                id: '0-1-1',
                taskId: '0-1',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-2-0-2-1-0-0-0-1-0-1",
                target: {tagName: "SPAN"},
                location: '/bugaboo/A/index.html',
                done: false
            },
            {
                id: '0-1-2',
                taskId: '0-1',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-2-1-0-0-0-0-0-3-0",
                target: {tagName: "A"},
                location: '/bugaboo/A/bugaboo-cameleon3.html',
                done: false
            },
            {
                id: '0-2-0',
                taskId: '0-2',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-3-1-1-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/A/create.html',
                done: false
            },
            {
                id: '0-2-1',
                taskId: '0-2',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-13-2-1-1-0-3",
                target: {tagName: "path"},
                location: '/bugaboo/A/create.html',
                done: false
            },
            {
                id: '0-3-0',
                taskId: '0-3',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-2-0-1-0-1-0-0-2-1-2-0",
                target: {tagName: "A"},
                location: '/bugaboo/A/create.html',
                done: false
            },
            {
                id: '0-3-1',
                taskId: '0-3',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-2-0-1-0-1-0-0-8-1-2-0",
                target: {tagName: "A"},
                location: '/bugaboo/A/create.html',
                done: false
            },
            {
                id: '0-4-0',
                taskId: '0-4',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-12-2-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/A/create.html',
                done: false
            },
            {
                id: '0-4-1',
                taskId: '0-4',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-0-0-1-0-0",
                alternate: [2],
                target: {tagName: "A"},
                location: '/bugaboo/A/create.html',
                done: false
            },
            {
                id: '0-4-2',
                taskId: '0-4',
                sessionId: '0-1-0-0',
                type: 'mousedown',
                treePath: "0-2-0-1-2-0-0-1-2-0-0",
                alternate: [1],
                target: {tagName: "A"},
                location: '/bugaboo/A/create.html',
                done: false
            },
            {
                id: '0-4-4',
                taskId: '0-4',
                sessionId: '0-1-0-0',
                type: 'click',
                treePath: "0-10-0-0-0-0-1-0-2-1-0-0-1-1-0",
                //alternate: [4],
                target: {tagName: "A"},
                location: '/bugaboo/A/cart.html',
                done: false
            },
            {
                id: '1-1-0',
                taskId: '0-1',
                sessionId: '0-1-0-1',
                type: 'mousedown',
                treePath: "0-2-0-2-0-0-0-0-0-0",
                target: {tagName: "A"},
                location: '/bugaboo/B/index.html',
                done: false
            },
            {
                id: '1-1-1',
                taskId: '0-1',
                sessionId: '0-1-0-1',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-2-1-0-0-0-0-0-2-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/B/bugaboo-cameleon3.html',
                done: false
            },
            {
                id: '1-2-0',
                taskId: '0-2',
                sessionId: '0-1-0-1',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-3-1-1-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/B/create.html',
                done: false
            },
            {
                id: '1-2-1',
                taskId: '0-2',
                sessionId: '0-1-0-1',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-13-2-1-1-0-3",
                target: {tagName: "path"},
                location: '/bugaboo/B/create.html',
                done: false
            },
            {
                id: '1-3-0',
                taskId: '0-3',
                sessionId: '0-1-0-1',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-2-0-1-0-1-0-0-2-1-2-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/B/create.html',
                done: false
            },
            {
                id: '1-3-1',
                taskId: '0-3',
                sessionId: '0-1-0-1',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-2-0-1-0-1-0-0-8-1-2-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/B/create.html',
                done: false
            },
            {
                id: '1-4-0',
                taskId: '0-4',
                sessionId: '0-1-0-1',
                type: 'mousedown',
                treePath: "0-4-0-0-0-0-1-0-5-0-12-2-0-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/B/create.html',
                done: false
            },
            {
                id: '1-4-1',
                taskId: '0-4',
                sessionId: '0-1-0-1',
                type: 'click',
                treePath: "0-10-0-0-0-0-1-0-2-1-0-0-0-0-0",
                target: {tagName: "SPAN"},
                location: '/bugaboo/B/cart.html',
                done: false
            }

        ];

        this.testTasks = [
            {
                id: '0-1',
                testCaseId: '0',
                step: 0,
                description: 'Find Cameleon stroller and configure to order'
            },
            {
                id: '0-2',
                testCaseId: '0',
                step: 1,
                description: 'Choose bassinet and select black canopy color'
            },
            {
                id: '0-3',
                testCaseId: '0',
                step: 2,
                description: ' Add running accessory, and a cup holder'
            },
            {
                id: '0-4',
                testCaseId: '0',
                step: 3,
                description: 'Purchase stroller, checking final cost total before completing'
            }
        ];

        this.testCases = [
            {
                id: '0',
                name: 'Bugaboo initial test case',
                description: 'Test case for Bugaboo web site',
                author: 'Gray Holland',
                created: '09.09.2015',
                modified: '',
                sessions: [
                    {
                        sessionId: '0-1-0-0',
                        tag: 'Bugaboo A',
                        location: '/bugaboo/A',
                        master: true
                    },
                    {
                        sessionId: '0-2-0-0',
                        tag: 'Bugaboo B',
                        location: '/bugaboo/B',
                        master: true
                    }
                ]
            }
        ];

        this.init = function init() {

            var self = this,
                tables = self.tables;

            $.indexedDB(self.dbName).done(function (db) {

                var ok = true,
                    database = db;

                console.log('[INFO] dbAdapter: Indexed database opened. Data base name ' + self.dbName +
                            ' version: ' + db.version + '; storages: ' + db.objectStoreNames.length);

                // Check if all stores are in the database
                $.each(tables, function (s) {

                    if (!db.objectStoreNames.contains(tables[s]) || db.objectStoreNames.length > Object.keys(tables).length) {

                        ok = false;

                    }

                });

                if (!ok) {

                    if (db.version) {

                        console.log('[INFO] dbAdapter: Database will be upgraded to new version, object stores will be created.');

                    }

                    setTimeout(function () {

                        self.upgradeDB(database);

                    }, 10);

                }

            });

        };

        this.upgradeDB = function upgradeDB(db) {

            var ver = 1 + db.version,
                tables = this.tables;

            $.indexedDB(this.dbName, {

                'version': ver,
                'upgrade': function (t) {

                    var s, k;

                    for (s in db.objectStoreNames) {

                        if (db.objectStoreNames.hasOwnProperty(s)) {

                            t.deleteObjectStore(db.objectStoreNames[s]);
                            console.log('[INFO] dbAdapter: Upgrade database, delete object store "', db.objectStoreNames[s], '".');

                        }
                    }

                    for (k in tables) {

                        if (tables.hasOwnProperty(k)) {

                            t.createObjectStore(tables[k]);
                            console.log('[INFO] dbAdapter: Upgrade database, create object store "' +
                                        tables[k] + '".');
                        }
                    }

                }

            }).done(function (db) {

                console.log('[INFO] dbAdapter: Indexed database and object storage available. Data base version: ' + db.version + '; storages : ' + db.objectStoreNames.length);

            }).fail(function (error) {

                console.error('[ERROR] DB Adapter: ', error.message);
                console.warn('[WARNING] dbAdapter: Indexed database not available. ' + error.message);

            });

        };

        this.getRecord = function getRecord(id) {

            return $.indexedDB(this.dbName).objectStore(this.tables.sessions).get(id.toString());

        };

        this.getLocationTestCases = function (location) {

            return this.testCases; /*.filter(function (testCase) {

                return testCase.sessions.map(function (session) {

                    return session.location;

                }).filter(function (loc) {

                    return location === loc || location === loc + 'index.html';

                });

            });*/

        };

        this.getTestCaseTasks = function (testCaseId) {

            return this.testTasks.filter(function (task) {

                return task.testCaseId === testCaseId;

            });

        };

        this.getTaskEvents = function (taskId, sessionId) {

            return this.taskEvents.filter(function (event) {

                return event.taskId === taskId && event.sessionId === sessionId;

            });

        };

         this.putRecord = function putRecord(id, data) {

            var self = this;

            data.events.forEach(function (e) {

                delete e.target.element;

            });

            return new Promise(function (resolve, reject) {

                $.indexedDB(self.dbName).objectStore(self.tables.sessions).put(data, id.toString()).done(function () {

                    console.log('[INFO] dbAdapter: session data saved.');
                    self.getAllRecords().done(resolve);

                }).fail(function (e, msg) {

                    console.warn('[INFO] dbAdapter: Failed to save session data. Error: ', msg);
                    reject();

                });

            });

        };

        this.deleteRecord = function deleteRecord(id) {

            var self = this;

            return new Promise(function (resolve, reject) {

                $.indexedDB(self.dbName).objectStore(self.tables.sessions).delete(id.toString()).done(function () {

                    self.getAllRecords().done(function () {

                        console.log('[INFO] dbAdapter: session data deleted.');
                        resolve(self.records);

                    });

                }).fail(function () {

                    console.warn('[INFO] dbAdapter: Failed to delete session data.');
                    reject();

                });

            });

        };

        this.getAllRecords = function getAllRecords() {

            var self = this,
                records = this.records = [];

            return $.indexedDB(self.dbName).objectStore(self.tables.sessions).each(function (r) {

                //console.log(r.value);
                records.push(r.value);

            }).done(function (r, e) {

                //console.log('--> result: %s, event: %s', r, e);
                //console.debug('Records: ', self.records);

            }).fail(function (e, msg) {

                console.warn('[WARNING] dbAdapter: Failed to get all records. Error: ', msg);

            });

        };

    }; // end of IDB class

    // DCipher class
    var DCipher = function () {

        //this.baseURL = '/dcipher-demo/';
        this.baseURL = '/';
        this.cssURL = 'css/d-cipher.css';
        this.lang = 'en';
        this.loc = Strings[this.lang];
        this.domId = {

            container: 'd-cipher-container',
            mouseOverStyle: 'd-cipher-mouseover-style',
            mouseOverClass: 'd-cipher-mouseover',
            cursor: 'd-cipher-cursor',
            canvasHolder: 'd-cipher-canvas-holder',
            menu: 'd-cipher-menu',
            butRecord: 'd-cipher-menu-but-record',
            butPlay: 'd-cipher-menu-but-play',
            butTest: 'd-cipher-menu-but-test',
            butList: 'd-cipher-menu-but-list',
            stat: 'd-cipher-stat',
            timeline: 'd-cipher-timeline',
            timelineTooltip: 'd-cipher-timeline-tooltip',
            timelineInfo: 'd-cipher-timeline-info',
            timelineCursor: 'd-cipher-timeline-cursor',
            timelineCircle: 'd-cipher-timeline-circle',
            timelineBrackets: 'd-cipher-timeline-brackets',
            click: 'd-cipher-click',
            dblClick: 'd-cipher-dblclick',
            highlightEvent: 'd-cipher-highlight-event',
            records: 'd-cipher-rec-list',
            mTooltip: 'd-cipher-m-tooltip',
            eventInfo: 'd-cipher-event-info',
            topMenu: 'd-cipher-topmenu',
            taskBar: 'd-cipher-taskbar',
            taskProgress: 'd-cipher-task-progress',
            butStartTask: 'd-cipher-but-start-task',
            testName: 'd-cipher-test-name',
            testList: 'd-cipher-test-list'

        };

        this.registerEventList = [

            'start',
            'mouseover',
            'mouseout',
            'mousedown',
            'mouseup',
            //'click',
            //'dblclick',
            //'keydown',
            'wheel',
            'mousewheel',
            'DOMMouseScroll'

        ];

        this.drawEventList = [

            'start',
            'mouseover',
            //'mouseout',
            'mousedown',
            'mouseup',
            'click',
            'dblclick',
            'keydown',
            'wheel',
            'mousewheel',
            'DOMMouseScroll'

        ];

        this.elementEventFilters = {

            path: ['mouseover', 'mouseout'],
            circle: this.registerEventList

        };

        this.mouse = {

            x: 0,
            y: 0

        };

        this.testCase = null;
        this.testTasks = [];
        this.taskEvents = [];
        this.currentTask = null;
        this.currentEvent = null;

        this.db = new IDB();
        this.user = {};
        this.sessionId = '';
        this.activeRecord = null;
        this.startEventIndex = 0;
        this.endEventIndex = 0;
        this.timeBrackets = [0, 0];
        this.appMode = '';
        this.eventsUnderMouse = [];
        this.timeLineEvents = [];
        this.tlMouse = {x: 0, y: 0, down: false};
        this.clickDelay = 200;
        this.timeLineOffsetLeft = 100;

        this.init = function init() {

            var self = this;

            self.db.init();
            self.db.getAllRecords().done(function () {

                var recList = self.getDomElement('records'),
                    path = window.location.pathname;

                self.testCases = self.db.getLocationTestCases(path);
                self.createRecordList();
                self.createTestList();
                self.restoreState();

                $(recList).on('mouseout', function () {

                    $(recList).data('tid', setTimeout(function () {

                        $(recList).hide();

                    }, 1000));

                });

                $(recList).on('mouseover', function () {

                    clearTimeout($(recList).data('tid'));

                });

                $('body').on('mousemove', {self: self}, self.mouseMoveHandler);

                $('document').ready(function () {

                    self.setupDOMListeners();

                });

            });

        };

        this.catchEvents = function catchEvents(e) {

            var self = this,
                el = document.elementFromPoint(e.clientX, e.clientY),
                list = self.registerEventList,
                type, p;

            for (var i = 0, il = list.length; i < il; i++) {

                p = list[i];
                type = p;

                if (typeof el['on' + p] === 'function'
                    && (!el.eventListenerList || !el.eventListenerList[type])) {

                    el.addEventListener(type, function (e) {

                        self.saveEvent(e);

                    });
                    el.dispatchEvent(new MouseEvent(type, e));

                }

            }

        };

        this.toggleRecMode = function toggleRecMode(e) {

            var self = this,
                cnvh = this.getDomElement('canvasHolder'),
                $stat = $(this.getDomElement('stat'));

            function updateStats() {

                self.updateStatString();

            }

            function catchEvents(e) {

                self.catchEvents(e);

            }

            if (this.appMode !== 'record' && (!e || e && e.target && e.target.className !== 'stop')) {

                // Turn on record mode
                //this.resetApp(this.appMode || 'record', window.location.pathname);
                this.resetApp(this.appMode || 'record');

                var ts = 1 * new Date();
                $('div', this.getDomElement('butRecord')).removeClass('rec').addClass('stop');
                $(cnvh).hide();
                $(this.getDomElement('butStartTest')).hide();
                $(this.getDomElement('butList')).hide();
                $stat.data('tid', setInterval(updateStats, 100)).fadeIn();
                $('body').on('mousemove', catchEvents);
                this.hideRecList();
                this.unsetActiveRecord();
                this.sessionId = ts.toString();
                this.activeRecord = {

                    id: this.sessionId,
                    testCase: this.testCase,
                    name: this.loc._Default_record_name + this.db.records.length,
                    description: '',
                    created: ts,
                    modified: ts,
                    author: this.user.fullname || this.loc._Anonym,
                    color: 'rgba(255, 0, 255, 1)',
                    duration: 0,
                    mouseMilesTotal: 0,
                    events: [],
                    eventsStat: {}

                };

                this.saveEvent(new MouseEvent('start', e));

            } else {

                // Turn off record mode
                this.appMode = '';
                $('div', this.getDomElement('butRecord')).removeClass('stop').addClass('rec');

                $stat.fadeOut();
                clearInterval($stat.data('tid'));
                $('body').off('mousemove', catchEvents);

                if (this.db.records.length) {

                    $(this.getDomElement('butList')).show();

                }

                var rec = this.activeRecord;

                if (rec && rec.events && rec.events.length > 1) {

                    var evt = rec.events[rec.events.length - 1];

                    rec.duration = evt.time;
                    rec.kpi = evt.kpi;
                    rec.mouseMilesTotal = evt.miles;
                    rec.eventsQty = 0;

                    for (var et in rec.eventsStat) {

                        rec.eventsQty += rec.eventsStat[et];

                    }

                    this.db.putRecord(this.sessionId, rec).then(function () {

                        $(self.getDomElement('butList')).show();
                        self.createRecordList();
                        self.toggleRecList();
                        $(':last-child > input', self.getDomElement('records')).attr('disabled', false).focus();
                        self.setActiveRecord(self.sessionId);
                        self.showSpiderGraph(self.sessionId);

                    });

                } else {

                    this.activeRecord = null;
                    this.sessionId = null;

                }

            }

            return this;

        };

        this.saveEvent = function saveEvent(e) {

            var self = this,
                etype = e.type,
                etarget = e.target || document.getElementsByTagName('body')[0],
                treePath = this.getTreePath(etarget),
                location = document.location.pathname,
                controls = !!$(this.getDomElement('topMenu')).find(etarget).length,
                save = (this.appMode === 'record' || this.appMode === 'test') &&
                       this.registerEventList.indexOf(etype) > -1
                       && !($(this.getDomElement('container')).find(etarget).length || controls)
                       && etarget.localName !== 'svg'
                       && etarget.localName !== 'circle';

            console.debug('Event type: %s, target: %s; record: %s', etype, etarget, save);
            //console.debug('TREE PATH: ', treePath);
            //console.debug('tagName: ', etarget.tagName);

            if (this.appMode === 'test' && !controls) {

                this.currentEvent = {

                    type: etype,
                    treePath: treePath,
                    tagName: etarget.tagName,
                    location: location

                };
                this.checkTaskCompletion();

            }

            if (save) {

                //console.debug('--> x, %s, y: %s', e.clientX, e.clientY);

                var rec = this.activeRecord,
                    events = rec.events,
                    elen = events.length,
                    lastEvent = events[elen - 1] || null,
                    milesTotal = this.getNDCMousePath(rec),
                    clientNDC = this.getNDC(e.clientX, e.clientY),
                    pageNDC = this.getNDC(e.pageX, e.pageY),
                    pageOffsetNDC = this.getNDC(pageXOffset, pageYOffset),
                    $el = $(etarget),
                    offs = $el.offset(),
                    left = offs.left,
                    top = offs.top,
                    event = {
                        id: new Date(),
                        taskId: this.currentTask ? this.currentTask.id : '',
                        sessionId: this.sessionId,
                        timeStamp: e.timeStamp,
                        index: elen,
                        location: location,
                        testTask: this.currentTask,
                        ndc: {
                            x: clientNDC.x,
                            y: clientNDC.y,
                            pageX: pageNDC.x,
                            pageY: pageNDC.y,
                            pageXOffset: pageOffsetNDC.x,
                            pageYOffset: pageOffsetNDC.y
                        },
                        bubbles: true,
                        cancelBubble: e.cancelBubble,
                        cancelable: e.cancelable,
                        defaultPrevented: e.defaultPrevented,
                        returnValue: true,
                        type: etype,
                        char: e.char,
                        shiftKey: e.shiftKey,
                        altKey: e.altKey,
                        ctrlKey: e.ctrlKey,
                        button: e.button,
                        which: e.which,
                        charCode: e.charCode,
                        deltaX: e.deltaX,
                        deltaY: e.deltaY,
                        deltaZ: e.deltaZ,
                        deltaMode: e.deltaMode,
                        x: e.clientX,
                        y: e.clientY,
                        clientX: e.clientX,
                        clientY: e.clientY,
                        pageX: e.pageX,
                        pageY: e.pageY,
                        winWidth: window.innerWidth,
                        winHeight: window.innerHeight,
                        docHeight: document.body.scrollHeight,
                        docWidth: document.body.scrollWidth,
                        pageXOffset: pageXOffset,
                        pageYOffset: pageYOffset,
                        target: {
                            treePath: treePath,
                            tagName: etarget.tagName,
                            localName: etarget.localName,
                            name: etarget.name,
                            title: etarget.title,
                            id: etarget.id,
                            className: typeof etarget.className === 'string' ? etarget.className : '',
                            width: $el.outerWidth(),
                            height: $el.outerHeight(),
                            x: left,
                            y: top,
                            dx: 0,
                            dy: 0,
                            localX: e.pageX - left,
                            localY: e.pageY - top,
                            relX: (e.pageX - left) / $el.outerWidth(),
                            relY: (e.pageY - top) / $el.outerHeight()
                        },
                        duration: lastEvent ? e.timeStamp - lastEvent.timeStamp : 0,
                        time: e.timeStamp - rec.modified

                    };

                if (lastEvent && lastEvent.type === etype
                    && lastEvent.target.treePath === event.target.treePath
                    && !etype.match(/scroll|wheel/i)) {

                    return;

                }

                event.milesLast = lastEvent ? this.getDistance(lastEvent.ndc, event.ndc) : milesTotal;
                event.drag = event.milesLast && etype === 'mouseup';
                event.miles = milesTotal + event.milesLast;

                if (etarget.dataset) {

                    event.target.dcipherName = etarget.dataset.dcipherName;
                    event.target.dcipherAction = etarget.dataset.dcipherAction;

                }
                if (etype === 'mouseup' && event.milesLast === 0) {

                    event = events.pop();
                    event.type = etype = 'click';
                    lastEvent = events[events.length - 1];

                    if (lastEvent && lastEvent.type === 'click' && event.milesLast === 0) {

                        events.pop();
                        event.type = etype = 'dblclick';

                    }

                }

                if (etype.match(/wheel|scroll/i) && lastEvent && lastEvent.type.match(/wheel|scroll/i)) {

                    event.dx = left - lastEvent.target.x;
                    event.dy = top - lastEvent.target.y;

                }

                if (!etype.match(/wheel|scroll/i) || !lastEvent.type.match(/wheel|scroll/i)) {

                    rec.eventsStat[etype] = rec.eventsStat[etype] ? rec.eventsStat[etype] + 1 : 1;
                    event.eventNo = rec.eventsStat[etype];

                }

                if (lastEvent && lastEvent.type.match(/wheel|scroll/i) && !etype.match(/wheel|scroll/i)) {

                    lastEvent.eventNo = rec.eventsStat['wheel'];

                }

                if (event.drag) {

                    rec.eventsStat['drag'] = rec.eventsStat['drag'] ? rec.eventsStat['drag'] + 1 : 1;
                    event.eventNo = rec.eventsStat['drag'];

                }

                if (this.currentTask && (!lastEvent || lastEvent.testTask.id !== this.currentTask.id)) {

                    event.firstInTask = true;

                }
                /*
                 var sd = 0;
                 rec.events.forEach(function (e) {

                 if (e.type === 'wheel') {

                 sd += self.getDistance({ x: 0, y: 0 }, { x: e.deltaX, y: e.deltaY })

                 }

                 });
                 */
                event.kpi = (event.time / 1000) * (((rec.eventsStat['click'] || 0) + (rec.eventsStat['drag'] || 0) + (rec.eventsStat['wheel'] || 0)) || 1) / (event.miles || 1);
                //event.kpi = event.miles * ((rec.eventsStat['click'] + rec.eventsStat['drag']) || 1) / (event.time / 1000);
                event.kpiLast = event.kpi;
                /*
                 event.kpiLast = lastEvent ? (event.kpi - lastEvent.kpi) : event.kpi;

                 console.debug('-------> event.kpiLast', event.kpiLast);
                 */

                events.push(event);
                rec.mouseMilesTotal = milesTotal;
                this.updateStatString(e);

            }

            return this;

        };

        this.setupDOMListeners = function setupDOMListeners() {

            var self = this;

            console.log('Setting up DOM listeners...');

            function setElementListeners(arr) {

                arr.each(function (i, el) {

                    for (var k in el) {

                        if (k.match(/^on/) && typeof el[k] === 'function' && el[k].toString().match(/stopPropagation|preventDefault/)) {

                            el.addEventListener(k.substr(2), function (e) {

                                self.saveEvent(e);

                            });
                            console.debug('DOM Listeners -> add event: "%s"', k.substr(2));

                        }

                    }
                    setElementListeners($(el).children());

                });

            }

            setElementListeners($('body').children(":not('#d-cipher-container, script')"));
            console.log('DOM listeners have been set up...');

        };

        this.getTreePath = function getTreePath(el) {

            var path = '',
                found = false;

            function parseTree(node, cid) {

                if (found) {

                    return;

                }

                var ch = node.tagName === 'BODY' ? $(node).children(":not('#d-cipher-container, script')") : $(node).children();

                for (var i = 0, len = ch.length; i < len; i++) {

                    if (ch[i] === el) {

                        path = cid + '-' + i;
                        found = true;
                        break;

                    } else {

                        parseTree(ch[i], cid + '-' + i);

                    }

                }

            }

            parseTree($('body')[0], '0');
            return path;

        };

        this.getElementByTreePath = function getElementByTreePath(path) {

            var pa = path.split('-'),
                el = $('body')[0];

            pa.shift();

            pa.forEach(function (p) {

                if (el) {

                    el = el.tagName === 'BODY' ? $(el).children(":not('#d-cipher-container, script')")[p] : $(el).children()[p];

                }

            });

            //console.debug('--> element: ', el);

            return el || window;

        };

        this.getDistance = function getDistance(p1, p2) {

            var asp = window.innerWidth / window.innerHeight;

            return Math.sqrt(Math.pow(((p2.x - p1.x) * asp), 2) + Math.pow((p2.y - p1.y) / asp, 2));

        };

        this.getNDCMousePath = function getNDCMousePath(rec) {

            var self = this,
                path = 0;

            rec.events.forEach(function (e, idx, arr) {

                if (idx > 0) {

                    path += self.getDistance(arr[idx - 1].ndc, e.ndc);

                }

            });

            return path;

        };

        this.getNDC = function getNDC() {

            var pos;

            if (arguments.length === 1) {

                pos = arguments[0];

            } else {

                pos = {

                    x: arguments[0],
                    y: arguments[1]

                }

            }

            return {

                x: 2 * pos.x / window.innerWidth - 1,
                y: 1 - 2 * pos.y / window.innerHeight

            }

        };

        this.getSC = function getSC() {

            var pos;

            if (arguments.length === 1) {

                pos = arguments[0];

            } else {

                pos = {

                    x: arguments[0],
                    y: arguments[1]

                }

            }

            return {

                x: (pos.x + 1) * window.innerWidth / 2,
                y: (1 - pos.y) * window.innerHeight / 2

            }

        };

        this.calcSC = function calcSC(rec) {

            var self = this;

            rec.events.forEach(function (e) {

                self.getTargetScreenPars(e);

            });

        };

        this.showTLTooltip = function showTLTooltip(e) {

            var self = this,
                event = this.getTimelineEvent(e),
                task = this.getTimelineTask(e),
                $tt = $(this.getDomElement('timelineTooltip')),
                $he = $(this.getDomElement('highlightEvent')),
                $tl = $(this.getDomElement('timeline')),
                loc = this.loc,
                html = '<table>',
                x, y, w, h, top, left;

            function calculateTTPosition() {

                if (y + 20 + h < window.innerHeight) {

                    top = y + 20;

                } else {

                    top = y - h - 10;

                }

                if (x - w / 2 - 5 < 0) {

                    left = 5;

                } else if (x + w / 2 + 5 > window.innerWidth) {

                    left = window.innerWidth - w - 5;

                } else {

                    left = x - w / 2;

                }

            }

            function getEventInfo(e) {

                var rId = e.sessionId,
                    rec = self.getRecordById(rId),
                    etarget = e.target,
                    html = '';

                if (etarget.dcipherName) {

                    html += '<tr><td class="tt-name">' + loc._Target + ':</td>' +
                            '<td class="tt-value">' + etarget.dcipherName + '</td></tr>';

                }

                if (etarget.dcipherAction) {

                    html += '<tr>' +
                            '<td class="tt-name">' + loc._Action + ':</td>' +
                            '<td class="tt-value">' + etarget.dcipherAction + '</td>' +
                            '</tr><tr>' +
                            '<td colspan = "2" class = "empty-row"></td>' +
                            '</tr><br />';

                }

                html += '<tr>' +
                        /*'<td class="tt-name">' + loc._Session_name + ':</td>' +*/
                        '<td class="tt-header" colspan="2">' + rec.name + '</td>' +
                        '</tr><tr>' +
                        '<td colspan = "2" class = "empty-row"></td>' +
                        '</tr>';

                html += '<tr>' +
                        //'<td colspan="2" class="tt-value">' + loc[e.type] + ' (' + e.eventNo + ' ' + loc._from + ' ' + rec.eventsStat[e.type] + ') ' + '</td>' +
                        '<td colspan="2" class="tt-header">' + loc[e.type] + ' #' + e.eventNo + '</td>' +
                        '</tr><tr>' +
                        '<td class="tt-name">' + '(' + self.getTimeString(e.time) /*+ ' – ' + self.getTimeString(rec.duration)*/ + ')</td> ' +
                        '<td class="tt-value">' + self.getTimeString(e.duration) + '</td>' +
                        '</tr><tr>' +
                        '<td class="tt-name">' + loc._Distance + ':</td>' +
                        '<td class="tt-value">' + (e.milesLast || 0).toFixed(2) + '</td>' +
                        '</tr><tr>' +
                        '<td class="tt-name">' + loc._KPI + ':</td>' +
                        '<td class="tt-value">' + e.kpiLast.toFixed(1) + '</td>' +
                        '</tr>';

                return html;
            }

            function getTaskInfo(task) {

                var html = '';

                html += '<tr><td class="tt-name">' + loc._Test_name + ':</td>' +
                        '<td class="tt-value">' + (self.testCase.name || 'Test #1') + '</td></tr>';

                html += '<tr>' +
                        '<td colspan = "2" class="tt-value">' + task.description + '</td>' +
                        '</tr><tr>';

                return html;

            }

            if (event) {

                x = event.clientX;
                y = event.clientY;

                if (!$tl.data('eiTID')) {

                    $tl.data('eiTID', setTimeout(function () {

                        $tt.hide();
                        self.showEventsInfo(event);

                    }, 5000));

                }

                $tl.css('cursor', 'pointer');
                if (event.event.index >= this.startEventIndex && event.event.index <= this.endEventIndex) {

                    $he.css({top: event.event.y, left: event.event.x}).show();

                } else {

                    $he.hide();

                }
                html += getEventInfo(event.event) + '</table>';
                $tt.html(html);
                w = $tt.outerWidth();
                h = $tt.outerHeight();
                calculateTTPosition();
                $tt.css('top', top).css('left', left)
                    .show();

            } else if (task) {

                x = e.clientX;
                y = e.clientY - 10;

                if (!$tl.data('eiTID')) {

                    $tl.data('eiTID', setTimeout(function () {

                        $tt.hide();

                    }, 5000));

                }

                $tl.css('cursor', 'pointer');
                html += getTaskInfo(task) + '</table>';
                $tt.html(html);
                w = $tt.outerWidth();
                h = $tt.outerHeight();
                calculateTTPosition();
                $tt.css('top', top).css('left', left)
                    .show();

            } else {

                $tl.css('cursor', 'default');
                $tt.hide();
                $he.hide();
                $(this.getDomElement('eventInfo')).hide();
                if ($tl.data('eiTID')) {

                    clearTimeout($tl.data('eiTID'));
                    $tl.data('eiTID', null);

                }

            }

        };

        this.showMouseTooltip = function showMouseTooltip(event) {

            var self = this,
                loc = self.loc,
                $tt = $(self.getDomElement('mTooltip')),
                cnvh = self.getDomElement('canvasHolder'),
                $cnvh = $(cnvh),
                x = event.clientX, y = event.clientY,
                evts = self.getEventsUnderMouse(x, y),
                html = '<table>', evt, rec,
                w, h, top, left;

            function getEventInfo(e) {

                var rId = e.sessionId,
                    rec = self.getRecordById(rId),
                    etarget = e.target,
                    html = '';

                if (etarget.dcipherName) {

                    html += '<tr><td class="tt-name">' + loc._Target + ':</td>' +
                            '<td class="tt-value">' + etarget.dcipherName + '</td></tr>';

                }

                if (etarget.dcipherAction) {

                    html += '<tr>' +
                            '<td class="tt-name">' + loc._Action + ':</td>' +
                            '<td class="tt-value">' + etarget.dcipherAction + '</td>' +
                            '</tr>';

                }

                html += '<tr>' +
                        /*'<td class="tt-name">' + loc._Session_name + ':</td>' +*/
                        '<td class="tt-header" colspan="2">' + rec.name + '</td>' +
                        '</tr><tr>' +
                        '<td colspan = "2" class = "empty-row"></td>' +
                        '</tr>';

                return html;
            }

            if (evts.length) {

                $cnvh.css('cursor', 'pointer');

                if (!$cnvh.data('eiTID')) {

                    $cnvh.data('eiTID', setTimeout(function () {

                        $(self.getDomElement('eventInfo')).hide();
                        self.showEventsInfo();

                    }, 5000));

                }

                evt = evts[0];
                rId = evt.sessionId;
                html += getEventInfo(evt);

                evts.forEach(function (e) {

                    rec = self.getRecordById(rId);

                    if (rId !== e.sessionId) {

                        rId = e.sessionId;
                        html += getEventInfo(e);

                    }

                    html += '<tr>' +
                            //'<td colspan="2" class="tt-value">' + loc[e.type] + ' (' + e.eventNo + ' ' + loc._from + ' ' + rec.eventsStat[e.type] + ') ' + '</td>' +
                            '<td colspan="2" class="tt-header">' + loc[e.type] + ' #' + e.eventNo + '</td>' +
                            '</tr><tr>' +
                            '<td class="tt-name">' + '(' + self.getTimeString(e.time) /*+ ' – ' + self.getTimeString(rec.duration)*/ + ')</td> ' +
                            '<td class="tt-value">' + self.getTimeString(e.duration) + '</td>' +
                            '</tr><tr>' +
                            '<td class="tt-name">' + loc._Distance + ':</td>' +
                            '<td class="tt-value">' + e.milesLast.toFixed(2) + '</td>' +
                            '</tr><tr>' +
                            '<td class="tt-name">' + loc._KPI + ':</td>' +
                            '<td class="tt-value">' + e.kpiLast.toFixed(1) + '</td>' +
                            '</tr>';

                });

                $tt.html(html + '</table>');
                w = $tt.outerWidth();
                h = $tt.outerHeight();

                if (y + 20 + h < window.innerHeight) {

                    top = y + 20;

                } else {

                    top = y - h - 10;

                }

                if (x - w / 2 - 5 < 0) {

                    left = 5;

                } else if (x + w / 2 + 5 > window.innerWidth) {

                    left = window.innerWidth - w - 5;

                } else {

                    left = x - w / 2;

                }

                $tt.css({
                    'top': top,
                    'left': left
                }).show();

            } else if (event.target.parentNode.id !== self.domId['timeline']) {

                $(self.getDomElement('eventInfo')).hide();
                $(self.getDomElement('timelineCircle')).hide();
                $cnvh.css('cursor', 'default');
                if ($cnvh.data('eiTID')) {

                    clearTimeout($cnvh.data('eiTID'));
                    $cnvh.data('eiTID', null);

                }
                $tt.hide();

            }

            //console.debug(html);

        };

        this.showEventsInfo = function (event) {

            var self = this,
                loc = this.loc,
                evts = this.eventsUnderMouse,
                $eInf = $(this.getDomElement('eventInfo')),
                dx = 0, dy = 0, html = '<table>', rec,
                top, left, x, y, w, h, shift = 10;

            evt = evts[0] || event.event;

            if (!evt) {

                return;

            }

            function getRecordInfo(rec) {

                var clicks = rec.eventsStat['click'],
                    showEvents = ['click', 'wheel', 'drag'];

                html = '<tr>' +
                       /*'<td class= "tt-name">' + loc._Session_name + ': ' + '</td>' +*/
                       '<td class= "tt-header" colspan="2">' + rec.name + '</td>' +
                       '</tr><tr>' +
                       '<td class= "tt-name">' + (new Date(rec.created)).toLocaleDateString() + '</td>' +
                       '<td class= "tt-value">' + (new Date(rec.modified)).toLocaleTimeString() + '</td>' +
                       '</tr><tr>' +
                       '<td colspan = "2" class = "empty-row"></td>' +
                       '</tr><tr>' +
                       '<td class= "tt-name">' + loc._Mouse_miles + ': </td>' +
                       '<td class= "tt-value">' + rec.mouseMilesTotal.toFixed(2) + '</td>' +
                       '</tr><tr>' +
                       '<td class= "tt-name">' + loc._Duration + ': </td>' +
                       '<td class= "tt-value">' + self.getTimeString(rec.duration) + '</td>' +
                       '</tr><tr>' +
                       '<td class= "tt-name">' + loc._Events + ': </td>' +
                       '<td class= "tt-value">' + rec.eventsQty + '</td>' +
                       '</tr><tr>';

                showEvents.forEach(function (k) {

                        if (rec.eventsStat[k]) {

                            html += '<td class= "tt-name">' + loc[k] + ': </td>' +
                                    '<td class= "tt-value">' + rec.eventsStat[k] + '</td>' +
                                    '</tr><tr>';

                        }

                    }
                );

                html += '<td class= "tt-name">' + loc._Clicks_sec + ': </td>' +
                        '<td class= "tt-value">' + (1000 * clicks / rec.duration).toFixed(1) + '</td>' +
                        '</tr><tr>' +
                        '<td class= "tt-name">' + loc._Miles_sec + ': </td>' +
                        '<td class= "tt-value">' + (1000 * rec.mouseMilesTotal / rec.duration).toFixed(2) + '</td>' +
                        '</tr><tr>' +
                        '<td class= "tt-name">' + loc._KPI + ': </td>' +
                        '<td class= "tt-value">' + rec.kpi.toFixed(1) + '</td>' +
                        '</tr>';

                return html;
            }

            rId = evt.sessionId;
            rec = self.getRecordById(rId);

            html += getRecordInfo(rec);

            evts.forEach(function (e) {

                dx += e.x;
                dy += e.y;

                if (rId !== e.sessionId) {

                    rId = e.sessionId;
                    rec = self.getRecordById(rId);
                    html += '<tr><td></td></tr>' + getRecordInfo(rec);

                }

                /*
                 html += '<br />' + self.getTimeString(e.time) + ' (' + self.getTimeString(e.duration) + ') ' + loc[e.type]
                 + ' #' + e.eventNo
                 + ' (' + e.milesLast.toFixed(2) + ' / ' + e.miles.toFixed(2) + ')';
                 */

                html += '<tr>' +
                        '<td colspan="2" class="tt-header">' + loc[e.type] + ' #' + e.eventNo + '</td>' +
                        '</tr><tr>' +
                        '<td class="tt-name">' + '(' + self.getTimeString(e.time) /*+ ' – ' + self.getTimeString(rec.duration)*/ + ')</td> ' +
                        '<td class="tt-value">' + self.getTimeString(e.duration) + '</td>' +
                        '</tr><tr>' +
                        '<td class="tt-name">' + loc._Distance + ':</td>' +
                        '<td class="tt-value">' + e.milesLast.toFixed(2) + '</td>' +
                        '</tr>';

            });

            $eInf.html(html + '</table>');
            w = $eInf.outerWidth();
            h = $eInf.outerHeight();
            x = event ? event.clientX : dx / evts.length;
            y = event ? event.clientY : dy / evts.length;

            if (y - h - shift > 5) {

                top = y - h - shift;

            } else /*if ( y + h + shift > window.innerHeight)*/ {

                top = y + shift;

            }

            if (x - w / 2 - 5 < 0) {

                left = 5;

            } else if (x + w / 2 + 5 > window.innerWidth) {

                left = window.innerWidth - w - 5;

            } else {

                left = x - w / 2;

            }

            $eInf.css('top', top).css('left', left).show();
            $(this.getDomElement('mTooltip')).hide();

        };

        this.getEventsUnderMouse = function getEventsUnderMouse(x, y) {

            var self = this,
                recs = this.db.records,
                abs = Math.abs,
                th = 5,
                evts = [];

            recs.forEach(function (r) {

                if (r.active && r.visible) {

                    var ea = r.events.filter(function (e, i, arr) {

                        return abs(x - e.x) < th && abs(y - e.y) < th
                               && (!i || !e.type.match(/wheel|scroll/i) || !arr[i - 1].type.match(/wheel|scroll/i))
                               && self.drawEventList.indexOf(e.type) > -1;

                    });

                    if (ea && ea.length) {

                        [].push.apply(evts, ea);

                    }

                }
            });

            this.eventsUnderMouse = evts;

            return evts;

        };

        this.canvasHolderClickHandler = function canvasHolderClickHandler(e, self) {

            if (self.eventsUnderMouse.length) {

                //self.showEventsInfo();
                self.showTimelineEvent(self.eventsUnderMouse[0]);

            }

        };

        this.updateStatString = function updateStatString(e) {

            var loc = this.loc,
                rec = this.activeRecord,
                evt = rec.events[rec.events.length - 1],
                ms = rec.modified,
                miles = evt ? evt.miles : 0,
                timeString = this.getTimeString(1 * new Date() - ms),
                clicks = rec.eventsStat.click || 0,
                drags = rec.eventsStat.drag || 0,
                wheels = rec.eventsStat.wheel || 0,
                el = document.elementFromPoint(this.mouse.x, this.mouse.y),
                trg = el.name || el.id || el.className,
            //type = e ? loc[e.type] : '',
                msg = ''; //loc._Recording + '.';

            msg += /*loc._Time + ': ' +*/ timeString + ' ';
            msg += loc._Mouse_miles + ': ' + miles.toFixed(2) + ' | ';
            msg += loc._Clicks + ': ' + clicks + ' | ';
            msg += loc._Drags + ': ' + drags + ' | ';
            msg += loc._Wheels + ': ' + wheels + ' | ';
            if (trg) {

                msg += loc._Target + ': ' + trg + ' | ';

            }
            msg += 'x: ' + this.mouse.x + ', y: ' + this.mouse.y;

            if (e && e.type === 'keypress') {

                msg += '; key: ' + String.fromCharCode(e.charCode);

            }

            this.getDomElement('stat').innerText = msg;
            //console.debug(msg);
            return this;

        };

        this.getTimeString = function getTimeString(ms) {

            var time = ms / 1000,
                hours, mins, secs, html = '';

            hours = Math.floor(time / 3600);
            mins = Math.floor((time - hours * 3600) / 60);
            secs = Math.floor(time - hours * 3600 - mins * 60);
            html += hours == 0 ? '' : hours < 10 ? '0' + hours + ':' : hours + ':';
            html += mins < 10 ? '0' + mins + ':' : mins + ':';
            html += secs < 10 ? '0' + secs : secs;

            return html;

        };

        this.getRecordById = function getRecordById(id) {

            var records = this.db.records,
                r = null;

            for (var i = 0, rl = records.length; i < rl; i++) {

                if (records[i].id == id) {

                    r = records[i];
                    break;

                }

            }

            return r;

        };

        this.getDomElement = function getDomElement(name) {

            return document.getElementById(this.domId[name]);

        };

        this.hideSpiderGraph = function hideSpiderGraph(sId) {

            var cnvh = this.getDomElement('canvasHolder');

            $('canvas[data-dcipher-rec-id=' + sId + ']', cnvh).hide();

            // Hide canvas holder div if no active session
            if (!$('canvas.cnv:visible', cnvh).length) {

                $(cnvh).hide();

            }

            this.getRecordById(sId).visible = false;
            if (this.activeRecord && this.activeRecord.id === sId) {

                this.clearTimeline();

            }

        };

        this.showSpiderGraph = function showSpiderGraph(sId, start, end) {

            var rec = this.getRecordById(sId);

            if (!rec) {

                return;

            }

            var cnvh = this.getDomElement('canvasHolder'),
                cnv = $('#cnvId-' + rec.id, cnvh)[0];

            $(cnvh).show();
            $(cnv).show();

            if (!rec.drawn || start || end) {

                this.drawSpiderGraph(sId, start, end);

            } else {

                $('canvas[data-dcipher-rec-id=' + sId + ']', cnvh).show();

            }

            rec.visible = true;

        };

        this.drawSpiderGraph = function showSpiderGraph(sId, start, end) {

            var self = this,
                rec = this.getRecordById(sId);

            if (!rec) {

                return;

            }

            var cnvh = this.getDomElement('canvasHolder'),
                data = rec.events.slice(start || 0, end || rec.events.length),
                cnv = $('canvas[data-dcipher-rec-id=' + sId + ']', cnvh)[0],
                ctx = cnv.getContext('2d');

            ctx.clearRect(0, 0, cnv.width, cnv.height);
            ctx.beginPath();

            // Draw lines
            data.forEach(function (e, i, ea) {

                var pe = ea[i - 1],
                    pos = self.getTargetScreenPars(e),
                    ppos = pe ? self.getTargetScreenPars(pe) : {},
                    ex = pos.x,
                    ey = pos.y;

                if (e.type === 'start') {

                } else if (e.drag) {

                    // Draw line to last mouse down position
                    //ctx.lineTo(pe.x, pe.y);
                    ctx.stroke();
                    ctx.save();

                    // Draw dashed line from last mouse down position
                    ctx.beginPath();
                    ctx.setLineDash([5, 5]);
                    ctx.moveTo(ppos.x, ppos.y);
                    ctx.lineTo(ex, ey);
                    ctx.stroke();
                    ctx.restore();

                    // Begin new path and move start to current mouse position
                    ctx.beginPath();
                    ctx.moveTo(ex, ey);

                } else if ((pe && !pe.type.match(/wheel|scroll/i)) || !e.type.match(/wheel|scroll/i) || e.index) {

                    ctx.lineTo(ex, ey);

                }

            });
            ctx.stroke();

            // Draw event pictograms
            ctx.setLineDash([]);
            ctx.beginPath();
            data.forEach(function (e, i, ea) {

                var pe = ea[i - 1],
                    pos = self.getTargetScreenPars(e),
                    ex = pos.x,
                    ey = pos.y;

                if (!e.type.match(/wheel|scroll/i)) {

                    self.drawEventPict(ctx, e.type, ex, ey);

                } else if (!pe || !pe.type.match(/wheel|scroll/i)) {

                    self.drawEventPict(ctx, 'wheel', ex, ey);

                }

            });

            ctx.stroke();
            ctx.fill();

            if (start === undefined && end === undefined) {

                /*
                 $(cnvh).show().on('mousemove', {self: this}, function (e) {

                 self.showMouseTooltip(e);
                 self.highlightTimeLineEvent(e);

                 });
                 */
                $(cnv).show();
                rec.drawn = true;
                this.checkRecordCheckbox(sId);

            }

            return this;

        };

        this.clearTimeline = function clearTimeline() {

            var cw = window.innerWidth,
                $tl = $(this.getDomElement('timeline')),
                cnv = $('canvas', $tl)[0],
                ctx = cnv.getContext('2d'),
                tlh = $tl.height();

            ctx.clearRect(0, 0, cw, tlh);

        };

        this.resetTimeline = function () {

            this.timeBrackets = [];
            this.startEventIndex = 0;
            this.endEventIndex = this.timeLineEvents.length - 1;
            if (this.activeRecord) {

                this.drawTimeline(this.activeRecord);

            }

        };

        this.drawTimeline = function drawTimeline(rec) {

            this.showTimelineStat(rec);

            var self = this,
                events = rec.events,
                $tl = $(this.getDomElement('timeline')),
                cnv = $('canvas', $tl)[0],
                ctx = cnv.getContext('2d'),
                cw = window.innerWidth,
                ch = $tl.height(),
                offsetRight = $(this.getDomElement('timelineInfo')).width(),
                offsetLeft = this.timeLineOffsetLeft,
                offsetTop = ch / 2,
                cy = window.innerHeight - ch + offsetTop,
                width = cw - offsetLeft - offsetRight,
                pxs = width / rec.duration,
                posx = offsetLeft,
                posx0, pe,
                showTaskNumber = !!rec.testCase;

            this.timeLineEvents = [];
            cnv.width = cw;
            cnv.height = ch;
            $(cnv).width(cw);
            $(cnv).height(ch);

            if (this.endEventIndex) {

                this.drawTLCursor(events[this.endEventIndex].time, rec.duration);

            }
            /*else {

             this.drawTLCursor(rec.duration, rec.duration);

             }
             */
            this.drawTLBrackets();

            ctx.lineWidth = 2.0;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = rec.color;
            ctx.font = "bold 14px 'Helvetica Neue'";
            ctx.clearRect(0, 0, cw, ch);
            ctx.moveTo(offsetLeft, offsetTop);
            self.drawEventPict(ctx, 'start', offsetLeft, offsetTop);
            ctx.stroke();

            events.forEach(function (e, i, arr) {

                //console.debug('---> posx:', posx);
                //console.debug('---> e.time:', e.time);

                if (e.eventNo) {

                    pe = arr[i - 1];
                    posx0 = posx;
                    posx = offsetLeft + pxs * e.time;

                    self.timeLineEvents.push({

                        type: 'timeline',
                        clientX: posx,
                        clientY: cy,
                        target: $('canvas', '#' + self.domId.timeline)[0],
                        x: posx,
                        y: offsetTop,
                        event: e

                    });

                    // Draw task number
                    if (showTaskNumber && e.testTask && e.firstInTask) {

                        //var tx = e.testTask.step ? posx : posx0;
                        var tx = posx;
                        ctx.save();
                        ctx.fillStyle = 'gray';
                        ctx.strokeStyle = 'gray';
                        ctx.lineWidth = 1.0;
                        ctx.beginPath();
                        ctx.moveTo(tx, 0);
                        ctx.lineTo(tx, ch);
                        ctx.stroke();
                        ctx.fillText(e.testTask.step + 1, tx + 5, ch - 10);
                        ctx.restore();

                    }

                    ctx.beginPath();
                    ctx.moveTo(posx0, offsetTop);
                    if (e.drag) {

                        ctx.setLineDash([3, 3]);

                    }
                    if (i && e.type.match(/wheel|scroll/i) && pe.type.match(/wheel|scroll/i)) {

                        ctx.setLineDash([1, 2]);

                    }
                    ctx.lineTo(posx, offsetTop);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    if (i) {

                        ctx.beginPath();
                        self.drawEventPict(ctx, pe.type, posx0, offsetTop);
                        ctx.stroke();
                        ctx.fill();

                    }

                }
            });

            // Draw last task line
            ctx.save();
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = 'gray';
            ctx.beginPath();
            ctx.moveTo(posx, 0);
            ctx.lineTo(posx, ch);
            ctx.stroke();
            ctx.restore();

            // Draw last event pict
            ctx.beginPath();
            self.drawEventPict(ctx, events[events.length - 1].type, posx, offsetTop);
            ctx.stroke();
            ctx.fill();

            $tl.show();

        };

        this.drawTLCursor = function (pos, total) {

            var pars = this.getTimeLineCursorPars(pos, total);

            $(this.getDomElement('timelineCursor')).css(pars).show();

        };

        this.drawTLBrackets = function (time1, time2) {

            var t1 = time1 !== undefined ? time1 : this.timeBrackets[0] !== undefined ? this.timeBrackets[0] : 0,
                t2 = time2 !== undefined ? time2 : this.timeBrackets[1] !== undefined ? this.timeBrackets[1] : this.activeRecord.duration,
                pars = this.getTimeLineBracketsPars(t1, t2);

            $(this.getDomElement('timelineBrackets')).css(pars).show();

        };

        this.showTimelineStat = function (rec) {

            var loc = this.loc,
                html = Math.round(rec.duration / 1000) + '<span>' + loc.sec + '</span> '
                       + ((rec.eventsStat.click || 0) + (rec.eventsStat.drag || 0) + (rec.eventsStat.wheel || 0)) + '<span>' + loc.evs + '</span>'
                       + rec.mouseMilesTotal.toFixed(1) + '<span>' + loc.mm + '</span>'
                       + rec.kpi.toFixed(1) + '<span>' + loc.kpi + '</span>';

            $(this.getDomElement('timelineInfo')).html(html);

        };

        this.getTimelineEvent = function getTimelineEvent(e) {

            var te = this.timeLineEvents,
                abs = Math.abs,
                th = 7, evt, event = null,
                i, il = te.length;

            for (i = 0; i < il; i++) {

                evt = te[i];
                if (abs(e.clientX - evt.clientX) < th && abs(e.clientY - evt.clientY) < th) {

                    event = evt;
                    break;

                }

            }

            return event;

        };

        this.getTimelineTask = function (e) {

            var te = this.timeLineEvents,
                $tl = $(this.getDomElement('timeline')),
                x, y = window.innerHeight - 20,
                abs = Math.abs,
                dx = 5, evt, task = null,
                i, il = te.length;

            for (i = 0; i < il; i++) {

                evt = te[i];
                if (evt.event.firstInTask) {

                    // Move hot spot to previous event
                    //x = i ? te[i - 1].clientX : evt.clientX;
                    x = evt.clientX;

                    if (abs(x + 10 - e.clientX) < dx && e.clientY > y) {

                        task = evt.event.testTask;
                        break;
                    }

                }

                //console.log('e.clientX: ', e.clientX, '; evt.clientX + 10: ', (evt.clientX + 10));
                //console.log('e.clientY: ', e.clientY, '; y: ', y);

            }

            if (task) {

                console.log('Task: ', task.description);
                $tl.css('cursor', 'pointer');

            } else {

                $tl.css('cursor', 'default');

            }
            return task;

        };

        this.getTaskTLEvents = function (task) {

            if (task && this.timeLineEvents.length) {

                var id = task.id;

                return this.timeLineEvents.filter(function (e) {

                    return e.event.testTask.id === id;

                });

            } else {

                return null;

            }

        };

        this.showTLTaskEvents = function (task) {

            var evts = this.getTaskTLEvents(task),
                tlEvents = this.timeLineEvents,
                idx1 = tlEvents.indexOf(evts[0]),
                idx2 = tlEvents.indexOf(evts[evts.length - 1]);

            // Move time bracket to the first event of the next task, just for design sake
            if (idx2 + 1 < this.timeLineEvents.length) {

                idx2 += 1;
            }

            var evt1 = tlEvents[idx1].event,
                evt2 = tlEvents[idx2].event;

            this.showSpiderGraph(this.activeRecord.id, evt1.index, evt2.index);
            this.drawTLBrackets(evt1.time, evt2.time);

        };

        this.showTimelineEvent = function showTimelineEvent(event) {

            this.sessionId = event.sessionId;
            this.activeRecord = this.getRecordById(event.sessionId);
            this.appMode = 'timeline';
            if (event.time < this.timeBrackets[0]) {

                this.startEventIndex = event.index;
                this.timeBrackets[0] = event.time;

            } else {

                this.endEventIndex = event.index;
                this.timeBrackets[1] = event.time;

            }
            this.drawTLBrackets.apply(this, this.timeBrackets);
            this.drawSpiderGraph(event.sessionId, this.startEventIndex, this.endEventIndex + 1);
            this.drawTLCursor(event.time, this.activeRecord.duration);

            if (window.location.pathname !== event.location) {

                window.location = event.location;

            }

        };

        this.drawEventPict = function (ctx, type, x, y) {

            if (this.drawEventList.indexOf(type) > -1) {

                var endAngle = 2 * Math.PI, d = 3;

                if (type === 'start') {

                    ctx.moveTo(x - 1, y - 3);
                    ctx.lineTo(x - 1, y + 3);

                } else if (type === 'click') {

                    ctx.moveTo(x + d, y);
                    ctx.arc(x, y, d, 0, endAngle, true);

                } else if (type === 'dblclick') {

                    var r = d - 1;
                    ctx.moveTo(x + 2 * r, y);
                    ctx.arc(x, y, 2 * r, 0, endAngle, true);
                    ctx.stroke();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(x + r, y);
                    ctx.arc(x, y, r, 0, endAngle, true);

                } else if (type === 'mousedown') {

                    ctx.moveTo(x + 3, y - 2);
                    ctx.lineTo(x, y + 3);
                    ctx.lineTo(x - 3, y - 2);
                    ctx.lineTo(x + 3, y - 2);

                } else if (type === 'mouseup') {

                    ctx.moveTo(x - 3, y + 2);
                    ctx.lineTo(x, y - 3);
                    ctx.lineTo(x + 3, y + 2);
                    ctx.lineTo(x - 3, y + 2);

                } else if (type === 'mouseover' || type === 'mouseenter'/* || type === 'mouseout' || type === 'mouseleave'*/) {

                    ctx.moveTo(x + 1, y);
                    ctx.arc(x, y, 1, 0, endAngle, true);

                } else if (type.match(/wheel|scroll/i)) {

                    ctx.moveTo(x - 3, y - 1);
                    ctx.lineTo(x, y - 4);
                    ctx.lineTo(x + 3, y - 1);
                    //ctx.lineTo(x - 3, y - 1);
                    ctx.closePath();

                    /*
                     ctx.moveTo(x + 2, y);
                     ctx.arc(x, y, 2, 0, endAngle, true);
                     */

                    ctx.moveTo(x - 3, y + 1);
                    ctx.lineTo(x, y + 4);
                    ctx.lineTo(x + 3, y + 1);
                    //ctx.lineTo(x - 3, y + 1);
                    ctx.closePath();

                    /*
                     ctx.strokeRect(x - 3, y - 2, 1.5, 4);
                     ctx.fillRect(x - 3, y - 2, 1.5, 4);
                     ctx.strokeRect(x, y - 2, 1.5, 4);
                     ctx.fillRect(x, y - 2, 1.5, 4);
                     */

                }

            }

        };

        this.playSession = function playSession(sId, eventIndex) {

            var self = this,
                rec = this.getRecordById(sId),
                btn = this.getDomElement('butPlay');

            if (btn.className.match(/play/i)) {

                $(btn).removeClass('play').addClass('stop');

            } else {

                $(btn).removeClass('stop').addClass('play');

            }

            if (!rec) {

                this.resetApp('');
                return;

            }

            var cnt = eventIndex || this.endEventIndex || 0,
                delay = 20, speed = 2,
                sData = rec.events,
                pars = this.getTargetScreenPars(sData[cnt]),
                el = pars.element,
                cnvh = this.getDomElement('canvasHolder'),
                cnv = $('#cnvId-' + rec.id, cnvh)[0],
                ctx = cnv.getContext('2d'),
                $cur = $(self.getDomElement('cursor')),
                $tlCursor = $(self.getDomElement('timelineCursor')),
                clickDelay = this.clickDelay,
                mOverElement,
                mOverClass = self.domId['mouseOverClass'];

            function playEvent(pars) {

                if (!self.appMode) {

                    return;

                }

                var e = sData[cnt],
                    etype = e.type;

                pars = pars || self.getTargetScreenPars(e);
                el = pars.element;
                self.endEventIndex = cnt;

                console.debug('--> playSession: event No: %s, event type: %s', cnt, etype);
                /*
                 if (pars.winScrollX || pars.winScrollY) {

                 window.scrollTo(pars.winScrollX, pars.winScrollY);

                 }
                 */

                if (etype === 'click') {

                    el.dispatchEvent(new MouseEvent('mousedown', e));
                    el.dispatchEvent(new MouseEvent('mouseup', e));
                    el.dispatchEvent(new MouseEvent('click', e));

                    self.showMouseDown(pars.x, pars.y);
                    setTimeout(function () {

                        self.hideMouseDown();

                    }, clickDelay);

                } else if (etype === 'dblclick') {

                    el.dispatchEvent(new MouseEvent('mousedown', e));
                    el.dispatchEvent(new MouseEvent('mouseup', e));
                    el.dispatchEvent(new MouseEvent('click', e));
                    el.dispatchEvent(new MouseEvent('mousedown', e));
                    el.dispatchEvent(new MouseEvent('mouseup', e));
                    el.dispatchEvent(new MouseEvent('click', e));
                    el.dispatchEvent(new MouseEvent('dblclick', e));

                    self.showDblClick(pars.x, pars.y);

                } else if (etype === 'mousedown' || etype === 'mouseup') {

                    el.dispatchEvent(new MouseEvent(etype, e));

                    if (etype === 'mousedown') {

                        self.showMouseDown(pars.x, pars.y);

                    } else if (etype === 'mouseup') {

                        setTimeout(function () {

                            self.hideMouseDown();

                        }, clickDelay);

                    }

                } else if (etype == 'mouseover' || etype == 'mouseout' || etype == 'mouseenter' || etype == 'mouseleave') {

                    el.dispatchEvent(new MouseEvent(etype, e));

                } else if (etype.match(/wheel|scroll/i)) {

                    //window.scrollTo(pars.winScrollX, pars.winScrollY);
                    window.scrollTo(e.pageXOffset, e.pageYOffset);
                    el.dispatchEvent(new WheelEvent(etype, e));
                    //$(el).offset({top: pars.top, left: pars.left});

                }

                $(cnv).css('cursor', 'none');

                setTimeout(function () {

                    moveCursor(pars);

                }, 0);

            }

            function moveCursor(pars) {

                var e1 = sData[cnt],
                    e2 = sData[++cnt];

                if (e1 && e2) {

                    var recDuration = rec.duration,
                        etime = e1.time,
                        dur = e2.timeStamp - e1.timeStamp,
                        pars1 = pars || self.getTargetScreenPars(e1),
                        pars2 = self.getTargetScreenPars(e2),
                        step = 0,
                        dt = speed * delay,
                        steps = dur / dt,
                        dx = pars2.x - pars1.x,
                        dy = pars2.y - pars1.y,
                        mouseDown = e1.type === 'mousedown' && e2.type === 'mouseup';

                    function drawStep() {

                        var x0, y0, x, y, el, dts;

                        x0 = pars1.x + dx * step;
                        y0 = pars1.y + dy * step;
                        step++;

                        if (step < steps && self.appMode) {

                            x = pars1.x + dx * step;
                            y = pars1.y + dy * step;
                            dts = etime + step * dt;
                            self.drawTLCursor(dts, recDuration);
                            self.drawTLBrackets(self.timeBrackets[0], dts);
                            setTimeout(drawStep, delay);

                        } else {

                            x = pars2.x;
                            y = pars2.y;
                            self.drawTLCursor(e2.time, recDuration);
                            self.drawTLBrackets(self.timeBrackets[0], e2.time);
                            if (self.appMode) {

                                setTimeout(function () {

                                    playEvent(pars2);

                                }, e2.type === 'mouseover' ? 0 : clickDelay);

                            } else {

                                $cur.hide();
                                $(mOverElement).removeClass(mOverClass);
                                self.removeMouseOverStyle();
                                $(cnv).css('cursor', 'default');
                                return;

                            }
                        }

                        $(cnvh).hide();
                        el = document.elementFromPoint(x, y);
                        $(cnvh).show();
                        $(cnv).css('cursor', 'none');

                        el.dispatchEvent(new MouseEvent('mousemove', {

                            bubbles: true,
                            cancelable: false,
                            button: e1.button,
                            which: e1.which,
                            clientX: x,
                            clientY: y,
                            pageX: x,
                            pageY: y,
                            view: window

                        }));

                        if (!mouseDown) {

                            /*
                             if (mOverElement !== el) {

                             if (mOverElement) {

                             mOverElement.dispatchEvent(new MouseEvent('mouseout'));
                             //$(mOverElement).removeClass(mOverClass);

                             }
                             if (self.addMouseOverClass(el, ':hover')) {

                             $(el).addClass(mOverClass);

                             }

                             el.dispatchEvent(new MouseEvent('mouseover', {

                             clientX: x,
                             clientY: y,
                             pageX: x,
                             pageY: y,
                             view: window

                             }));
                             mOverElement = el;

                             }
                             */

                        } else {

                            self.showMouseDown(x, y);
                            ctx.save();
                            ctx.setLineDash([3, 5]);

                        }

                        $cur.css('top', y).css('left', x);
                        ctx.beginPath();

                        ctx.moveTo(x0, y0);
                        ctx.lineTo(x, y);
                        ctx.stroke();

                        if (mouseDown) {

                            ctx.restore();

                        }

                        if (step === 1) {

                            ctx.beginPath();
                            self.drawEventPict(ctx, e1.type, pars1.x, pars1.y);
                            ctx.stroke();
                            ctx.fill();

                        }

                    }

                    function scrollWindow(x, y, dx, dy) {

                        var wx = window.pageXOffset,
                            wy = window.pageYOffset,
                            call = false;

                        dx = dx || (x - wx) / 10;
                        dy = dy || (y - wy) / 10;

                        if ((dx > 0 && wx < x && wx + dx < x)
                            || dx < 0 && wx > x && wx + dx > x) {

                            wx += dx;
                            call = true;

                        } else {

                            wx = x;

                        }

                        if ((dy > 0 && wy < y && wy + dy < y)
                            || dy < 0 && wy > y && wy + dy > y) {

                            wy += dy;
                            call = true;

                        } else {

                            wy = y;

                        }

                        window.scrollTo(wx, wy);

                        if (call) {

                            setTimeout(function () {

                                scrollWindow(x, y, dx, dy);

                            }, 20);

                        }

                    }

                    if (pars2.winScrollX || pars2.winScrollY) {

                        //window.scrollTo(pars2.winScrollX, pars2.winScrollY);
                        scrollWindow(pars2.winScrollX, pars2.winScrollY);

                    }

                    self.drawTLCursor(etime, recDuration);
                    self.drawTLBrackets(self.timeBrackets[0], etime);
                    if (dx || dy && (e1.type === e2.type && !e1.type.match(/wheel|scroll/i))) {

                        if (steps) {

                            dx = dx / steps;
                            dy = dy / steps;

                        }
                        //console.debug('--> moveCursor->drawStep: dx: %s, dy: %s', dx, dy);
                        setTimeout(drawStep, delay);

                    } else {

                        //setTimeout(function () {

                        playEvent(pars2);

                        //}, 0);

                    }

                } else {

                    // End of play
                    $cur.hide();
                    $(mOverElement).removeClass(mOverClass);
                    self.removeMouseOverStyle();
                    $(cnv).css('cursor', 'default');
                    $(btn).removeClass('stop').addClass('play');

                    if (cnt === sData.length) {

                        self.drawSpiderGraph(rec.id, self.startEventIndex);

                    } else {

                        self.drawSpiderGraph(rec.id, 0, cnt);

                    }
                    self.appMode = '';
                    sessionStorage.removeItem('dcipherState');

                }

            }

            //this.appMode = 'play';
            this.sessionId = sId;
            this.activeRecord = rec;

            // Reload initial session location on replay start
            if (!cnt || cnt === sData.length - 1) {

                this.endEventIndex = 1;
                this.resetApp('play', sData[1].location);
                return;

            } else {

                this.appMode = 'play';

            }

            $(cnv).css('cursor', 'none');
            el.dispatchEvent(new MouseEvent('mousemove', {

                bubbles: true,
                cancelable: false,
                clientX: pars.x,
                clientY: pars.y,
                pageX: pars.x,
                pageY: pars.y,
                view: window

            }));
            mOverElement = el;
            this.addMouseOverClass(el, ':hover');
            $(el).addClass(mOverClass);
            $(cnv).show();
            $cur.show();
            $tlCursor.show();
            this.hideRecList();
            this.setActiveRecord(sId);
            this.drawTLBrackets(this.timeBrackets[0], sData[cnt].time);
            ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
            ctx.strokeStyle = rec.color;
            //if (eventIndex !== undefined) {

            this.showSpiderGraph(sId, this.startEventIndex, cnt + 1);

            //}

            setTimeout(function () {

                //if (cnt) {

                playEvent(pars);

                //} else {

                //moveCursor(pars);

                //}

            }, clickDelay);

        };

        this.getTargetScreenPars = function getTargetScreenPars(e) {

            var etarget = e.target,
                winW = window.innerWidth,
                winH = window.innerHeight,
                winScrollX = 0,
                winScrollY = 0,
                x = e.x,
                y = e.y,
                el = null, $el = null;

            if (!etarget.element || (etarget.element && etarget.element === window)) {

                el = this.getElementByTreePath(etarget.treePath);
                $el = $(el);

            } else {

                el = etarget.element;
                $el = $(el);

            }

            if ($el && etarget.tagName === el.tagName
                && etarget.id === el.id
                && etarget.title === el.title
                //&& etarget.dcipherName === el.dataset.dcipherName
                //&& etarget.dcipherAction === el.dataset.dcipherAction
                && $(el).is(':visible')
                && !e.type.match(/wheel|scroll/i)
            ) {

                var offset = $el.offset(),
                    elX = offset.left,
                    elY = offset.top,
                    elW = $el.outerWidth(),
                    elH = $el.outerHeight(),
                    locX = elW * etarget.relX,
                    locY = elH * etarget.relY,
                    cpx = 20,
                    cpy = 20;

                etarget.element = el;
                /*
                 x = elX + locX;
                 y = elY + locY;
                 */

                if (x + cpx > pageXOffset + winW) {

                    winScrollX = x + cpx - winW;
                    x -= winScrollX;

                }

                if (y + cpy > pageYOffset + winH) {

                    winScrollY = y + cpy - winH;
                    y -= winScrollY;

                }

                /*
                 e.pageX += x - e.x;
                 e.pageY += y - e.y;
                 e.clientX = x;
                 e.clientY = y;
                 e.x = x;
                 e.y = y;
                 */

            }

            return {

                element: el,
                x: x,
                y: y,
                left: elX + etarget.dx,
                top: elY + etarget.dy,
                localX: locX,
                localY: locY,
                width: elW,
                height: elH,
                winScrollX: winScrollX,
                winScrollY: winScrollY

            }

        };

        this.removeMouseOverStyle = function removeMoverStyle() {

            $('style#' + this.domId.mouseOverStyle, '#' + this.domId.container).remove();

        };
        this.addMouseOverClass = function getPseudoClass(el, pclass) {

            var sheets = document.styleSheets,
                rules, s, r, selectorText, rule,
                selectors = [],
                styles = '', styleNode = document.createElement('style'),
                mouseOverStyleId = this.domId.mouseOverStyle,
                $container = $('#' + this.domId.container);

            if (el.id) {

                selectors.push('#' + el.id + pclass);

            }

            if (el.className && typeof el.className === 'string') {

                el.className.split(" ").forEach(function (s) {

                    if (s) {

                        selectors.push('.' + s + pclass);

                    }

                });

            }

            for (s = 0; s < sheets.length; s++) {

                rules = sheets[s].rules || sheets[s].cssRules || [];

                for (r = 0; r < rules.length; r++) {

                    rule = rules[r];
                    selectorText = rule.selectorText;

                    selectors.forEach(function (c) {

                        if (selectorText && selectorText.match(new RegExp(c))) {

                            var ct = rule.cssText;

                            styles += ct.substring(ct.indexOf('{') + 1, ct.indexOf('}'));

                            //console.debug('---> cssObj: ', cssObj);

                        }

                    });
                }

            }

            $('#' + mouseOverStyleId, $container).remove();

            if (styles) {

                $(styleNode).attr('id', mouseOverStyleId).text('.' + this.domId.mouseOverClass + ' {' + styles + '}');
                $container.append(styleNode);
                return true;

            } else {

                return false;

            }

        };

        this.toggleRecList = function toggleRecList() {

            var rlId = this.domId['records'],
                rbId = this.domId['butList'],
                $rl = $('#' + rlId);

            function hideReclist(e) {

                if ($rl.is(':visible') && !$rl.find(e.target).length && e.target.id !== rbId && !$('#' + rbId).find(e.target).length) {

                    $rl.hide();

                }

            }

            if (!$rl.is(':visible') && this.db.records.length) {

                this.setRecListPosition();
                $rl.show();
                $('body').on('click', hideReclist);

            } else {

                $rl.hide();
                $('body').off('click', hideReclist);

            }

        };

        this.setRecListPosition = function setRecListPosition() {

            var $butList = $(this.getDomElement('butList')),
                p = $butList.offset(),
                $rl = $(this.getDomElement('records')),
                hidden = $rl.css('display') === 'none';

            if (hidden) {

                $rl.css('display', 'block')
                    .css('visibility', 'hidden');

            }

            /*
             $rl.css('top', p.top - window.pageYOffset + ($butList.outerHeight() - $rl.outerHeight()) / 2)
             .css('left', p.left - window.pageXOffset + 1.5 * $butList.outerWidth());
             */
            if (hidden) {

                $rl.css('visibility', 'visible')
                    .css('display', 'none');

            }

        };

        this.createRecordList = function createRecordList() {

            var self = this,
                recListDiv = this.getDomElement('records'),
                cnvHolder = this.getDomElement('canvasHolder'),
                visRecs = {}, actRecs = {},
                rec, butShow, butDel, butPlay, inpName, nChckb,
                cnv, ctx, butCp, cpInp, cpSp;

            if (!this.db.records.length) {

                $(recListDiv).hide();
                $(cnvHolder).hide();
                $(this.getDomElement('butList')).hide();
                return;

            }

            // Get all visible records
            $('input:checkbox', recListDiv).each(function () {

                visRecs[$(this).attr('data-dcipher-rec-id')] = $(this).prop('checked');

            });

            // Get all active records
            $('.rec', recListDiv).each(function () {

                actRecs[$(this).attr('data-dcipher-rec-id')] = $(this).hasClass('active');

            });

            if (!visRecs.length) {

                $(cnvHolder).hide();

            }
            $(recListDiv).children().remove();
            $(cnvHolder).children('.cnv').remove();
            this.db.records.forEach(function (r, idx) {

                // Restore visibility and active flags
                r.visible = visRecs[r.id];
                r.active = actRecs[r.id];
                r.drawn = false;
                self.calcSC(r);

                // Record canvas
                cnv = document.createElement('canvas');
                cnv.setAttribute('data-dcipher-rec-id', r.id);
                cnv.height = window.innerHeight;
                cnv.width = window.innerWidth;
                cnv.id = 'cnvId-' + r.id;
                cnv.className = 'cnv';
                ctx = cnv.getContext('2d');
                ctx.lineWidth = 1.5;
                ctx.fillStyle = 'white';
                ctx.strokeStyle = r.color;
                ctx.lineCap = 'square';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4.0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 3.0;
                ctx.shadowBlur = 4.0;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                cnvHolder.appendChild(cnv);

                // Record div
                rec = document.createElement('div');
                rec.id = 'recId-' + r.id;
                rec.className = 'rec' + (actRecs[r.id] ? ' active' : '');
                rec.setAttribute('data-dcipher-rec-id', r.id);

                // Show record button
                nChckb = document.createElement('input');
                nChckb.setAttribute('data-dcipher-rec-id', r.id);
                nChckb.setAttribute('cnv-id', idx);
                nChckb.type = 'checkbox';
                nChckb.id = 'showRecId-' + r.id;
                nChckb.value = r.id;
                nChckb.className = "chckb-show";
                nChckb.checked = visRecs[r.id];
                rec.appendChild(nChckb);

                butShow = document.createElement('label');
                butShow.setAttribute('data-dcipher-rec-id', r.id);
                butShow.setAttribute('cnv-id', idx);
                butShow.htmlFor = 'showRecId-' + r.id;
                butShow.className = 'show';
                butShow.title = dCipher.loc._Toggle_record;
                rec.appendChild(butShow);

                // Delete Record button
                butDel = document.createElement('div');
                butDel.setAttribute('data-dcipher-rec-id', r.id);
                butDel.id = 'delRecId-' + r.id;
                butDel.className = 'del';
                butDel.innerHTML = '&#10005;';
                butDel.title = dCipher.loc._Delete_record;
                rec.appendChild(butDel);

                // Color picker
                cpInp = document.createElement('input');
                cpInp.type = 'hidden';
                cpInp.value = r.color;

                cpSp = document.createElement('span');
                cpSp.className = 'input-group-addon cp-span';
                cpi = document.createElement('i');
                cpi.className = 'cp-i';
                cpi.style.backgroundColor = r.color;
                cpi.title = dCipher.loc._Change_color;
                cpSp.appendChild(cpi);

                butCp = document.createElement('div');
                butCp.setAttribute('data-dcipher-rec-id', r.id);
                butCp.id = 'cpId-' + r.id;
                butCp.className = 'cp-container input-group';
                butCp.appendChild(cpInp);
                butCp.appendChild(cpSp);
                rec.appendChild(butCp);

                // Play record button
                /*
                 butPlay = document.createElement('div');
                 butPlay.setAttribute('data-dcipher-rec-id', r.id);
                 butPlay.id = 'playRecId-' + r.id;
                 butPlay.className = 'play';
                 butPlay.title = dCipher.loc._Play_record;
                 rec.appendChild(butPlay);
                 */

                // Edit name field
                inpName = document.createElement('input');
                inpName.setAttribute('data-dcipher-rec-id', r.id);
                inpName.placeholder = self.loc._Name_placeholder;
                inpName.type = 'text';
                inpName.value = r.name;
                inpName.disabled = true;
                inpName.id = 'recNameId-' + r.id;
                inpName.className = 'rec-name';
                rec.appendChild(inpName);

                recListDiv.appendChild(rec);
                self.setRecListPosition();

                // Define listeners
                nChckb.addEventListener('change', function () {

                    var $el = $(this);

                    if ($el.prop('checked')) {

                        self.showSpiderGraph($el.attr('data-dcipher-rec-id'));

                    } else {

                        var id = $el.attr('data-dcipher-rec-id');

                        if (self.activeRecord && self.activeRecord.id === id) {

                            self.unsetActiveRecord();

                        } else {

                            self.hideSpiderGraph(id);

                        }

                    }

                });

                butDel.addEventListener('click', function () {

                    self.deleteRecord($(this).attr('data-dcipher-rec-id'));

                });

                /*
                 butPlay.addEventListener('click', function () {

                 self.playSession($(this).attr('data-dcipher-rec-id'));

                 });
                 */

                inpName.addEventListener('change', function () {

                    var $el = $(this);
                    self.updateRecordName($el.attr('data-dcipher-rec-id'), $el.val());
                    //$el.attr('disabled', true);

                });

                inpName.addEventListener('blur', function () {

                    var $el = $(this);
                    $el.attr('disabled', true);

                });

                rec.addEventListener('dblclick', function () {

                    var $el = $('input[type="text"]', this);
                    $el.attr('disabled', false).focus();

                });

                rec.addEventListener('click', function (e) {

                    var $el = $(e.target),
                        id = $el.attr('data-dcipher-rec-id');

                    if ($el.attr('type') === 'text') {

                        self.showSpiderGraph(id);
                        self.setActiveRecord(id, true);

                    }

                });

                // Draw record spidergraph if active
                if (visRecs[r.id]) {

                    self.showSpiderGraph(r.id);

                    if (actRecs[r.id]) {

                        self.drawTimeline(r);

                    }

                }

                $(butCp).colorpicker({

                    format: 'rgba',
                    container: butCp,
                    //align: 'right',
                    customClass: 'cp-pos',
                    colorSelectors: ['magenta', 'red', 'orange', 'yellow', 'limegreen', 'aqua', 'lightseagreen', 'royalblue', 'silver', 'gray', 'black']

                }).on('hidePicker.bs-colorpicker', function () {
                    //
                    var $el = $(this);

                    self.updateRecordColor($el.attr('data-dcipher-rec-id'), $el.colorpicker('getValue'));

                });

            });

        };

        this.setActiveRecord = function setActiveRecord(id, reset) {

            var self = this,
                recs = this.getDomElement('records'),
                $rec = $('#recId-' + id, recs),
                $chkb = $('input[type="checkbox"]#showRecId-' + id, $rec);

            $('.rec', recs).removeClass('active');
            $rec.addClass('active');

            this.db.records.forEach(function (r) {

                if (r.id == id) {

                    r.active = true;
                    r.visible = true;
                    self.activeRecord = r;
                    self.sessionId = r.id;
                    if (self.appMode !== 'timeline' || reset) {

                        self.startEventIndex = 0;
                        self.endEventIndex = r.events.length - 1;
                        self.timeBrackets = [0, r.duration];

                    }
                    self.drawTimeline(r);

                } else {

                    r.active = false;

                }

            });

            if (!$chkb.prop('checked')) {

                $chkb.prop('checked', true);

            }

        };

        this.unsetActiveRecord = function () {

            if (this.activeRecord) {

                var id = this.activeRecord.id;

                $('#recId-' + id, this.getDomElement('records')).removeClass('active');
                if (this.db.records.length) {

                    this.getRecordById(id).active = false;

                }
                this.hideSpiderGraph(id);

                this.activeRecord = null;
                $(this.getDomElement('timelineInfo')).html('');
                $(this.getDomElement('timeline')).hide();

            }

        };

        this.deleteRecord = function deleteRecord(id) {

            var self = this;

            this.unsetActiveRecord();
            this.db.deleteRecord(id).then(function () {

                self.createRecordList();

            }, function (e, msg) {

                console.warn('[WARN] Could not delete record. Error:', msg);

            });

        };

        this.updateRecordName = function updateRecordName(id, name) {

            var self = this,
                rec = this.getRecordById(id);

            rec.name = name;
            delete rec.drawn;
            this.db.putRecord(id, rec).then(function () {

                self.createRecordList();
                self.setActiveRecord(id);
                self.showSpiderGraph(id);

            }, function (e, msg) {

                console.warn('[WARN] Could not update record. Error:', msg);

            });

        };

        this.updateRecordColor = function updateRecordColor(id, color) {

            var self = this,
                rec = this.getRecordById(id);

            if (rec.color !== color) {

                rec.color = color;
                delete rec.drawn;
                this.db.putRecord(id, rec).then(function () {

                    self.createRecordList();

                }, function (e, msg) {

                    console.warn('[WARN] Could not update record. Error:', msg);

                });

            }

        };

        this.checkRecordCheckbox = function checkRecordCheckbox(sId) {

            $('input:checkbox[data-dcipher-rec-id=' + sId + ']', this.getDomElement('records')).prop('checked', true);
            this.getRecordById(sId).visible = true;

        };

        this.hideRecList = function hideRecList() {

            $(this.getDomElement('records')).hide();

        };

        this.showMouseClick = function showMouseClick(x, y) {

            var $el = $(this.getDomElement('click'));

            function showClick() {

                $el.css('left', x - $el.outerWidth() / 2).css('top', y - $el.outerHeight() / 2)
                    .show().fadeOut();

            }

            setTimeout(showClick, 0);

        };

        this.showDblClick = function showMouseClick(x, y) {

            var self = this,
                $el = $(this.getDomElement('dblClick'));

            function showClick() {

                $el.css('left', x - $el.outerWidth() / 2).css('top', y - $el.outerHeight() / 2)
                    .show();

                setTimeout(function () {

                    $el.fadeOut('fast');

                }, self.clickDelay);

            }

            this.showMouseClick(x, y);
            setTimeout(showClick, 0);

        };

        this.showMouseDown = function showMouseDown(x, y) {

            var $el = $(this.getDomElement('click'));

            $el.css('left', x - $el.outerWidth() / 2).css('top', y - $el.outerHeight() / 2).show();

        };

        this.hideMouseDown = function hideMouseDown() {

            $(this.getDomElement('click')).fadeOut('fast');

        };

        this.mouseMoveHandler = function mouseMoveHandler(e) {

            e.data.self.mouse = {

                x: e.clientX,
                y: e.clientY

            }

        };

        this.saveState = function saveState() {

            if (this.appMode) {

                if (this.appMode === 'test') {

                    this.checkTaskCompletion();

                }

                this.activeRecord.events.forEach(function (e) {

                    delete e.target.element;

                });

                sessionStorage.setItem('dcipherState', JSON.stringify({

                    user: this.user,
                    appMode: this.appMode,
                    activeRecord: this.activeRecord,
                    sessionId: this.sessionId,
                    startEventIndex: this.startEventIndex,
                    endEventIndex: this.endEventIndex,
                    testCase: this.testCase,
                    currentTask: this.currentTask,
                    currentEvent: this.currentEvent,
                    timeBrackets: this.timeBrackets

                }));

            } else {

                sessionStorage.removeItem('dcipherState');

            }
        };

        this.restoreState = function restoreState() {

            var self = this,
                state = JSON.parse(sessionStorage.getItem('dcipherState') || '{}');

            for (var k in state) {

                if (state[k]) {

                    this[k] = state[k];

                }

            }

            if (this.currentTask) {

                this.testCase[this.currentTask.step] = this.currentTask;

            }

            if (this.appMode === 'record' || this.appMode === 'test') {

                $('div', this.getDomElement('butRecord')).removeClass('rec').addClass('stop');
                $(this.getDomElement('butList')).hide();
                $('body').on('mousemove', function (e) {

                    self.catchEvents(e);

                });
                $(this.getDomElement('stat')).data('tid', setInterval(function updateStats() {

                    self.updateStatString();

                }, 100)).fadeIn();

            } else if (this.appMode === 'play') {

                $('div', this.getDomElement('butPlay')).removeClass('play').addClass('stop');
                this.showSpiderGraph(this.activeRecord.id, 0, this.endEventIndex + 1);
                setTimeout(function () {

                    self.playSession(self.activeRecord.id, self.endEventIndex);

                }, 1000);

            } else if (this.appMode === 'timeline') {

                var event = this.activeRecord.events[this.endEventIndex],
                    tEvt;

                this.setActiveRecord(this.activeRecord.id);
                this.showSpiderGraph(this.activeRecord.id, this.startEventIndex, this.endEventIndex + 1);

                tEvt = this.timeLineEvents.find(function (e) {

                    return e.event.index === event.index;

                });
                this.showTLTooltip(tEvt);
                this.drawTLBrackets();
                sessionStorage.removeItem('dcipherState');
                this.appMode = '';

            }

            if (this.appMode !== 'test') {

                $(this.getDomElement('butStartTest')).show();

            } else if (this.currentTask) {

                this.activateTask(this.currentTask, true);

            }

        };

        this.resetState = function resetState() {

            sessionStorage.removeItem('dcipherState');
            if (this.activeRecord) {

                var loc = this.activeRecord.events[0].location;

                this.activeRecord = null;
                this.appMode = '';
                this.endEventIndex = 0;
                window.location = loc;

            }

        };

        this.createTaskList = function () {

            var self = this,
                $tb = $(this.getDomElement('taskBar')),
                w = $tb.outerHeight(),
                d, sn, sd;

            function mouseUpHandler(e) {

                var tc = self.testCase,
                    step = 1 * $(e.target).attr('step'),
                    clickedTask = tc[step],
                    nextStep = step + 1;

                e.stopPropagation();

                if (clickedTask.done) {

                    //self.setTaskUndone(clickedTask);
                    self.activateTask(clickedTask);

                } else if (clickedTask.active) {

                    self.setTaskDone(clickedTask);
                    if (nextStep < tc.length) {

                        self.activateTask(tc[nextStep]);

                    } else {

                        self.endOfTest();

                    }

                } else {

                    if (/*!step && */!self.appMode) {

                        self.startTest();

                    }
                    /* else {

                     self.activateTask(clickedTask);

                     }*/

                }

            }

            this.testTasks = this.db.getTestCaseTasks(this.testCase.id);

            var rp = window.innerWidth - w * (this.testTasks.length);

                this.testTasks.forEach(function (t, i) {

                t.done = false;
                d = document.createElement('div');
                d.className = 'd-cipher-task';
                d.style.left = rp + w * i + 'px';

                sn = document.createElement('span');
                sn.className = 'step-number';
                sn.innerHTML = i + 1;
                sn.setAttribute('step', i);
                d.appendChild(sn);

                sd = document.createElement('span');
                sd.className = 'task-description';
                sd.innerText = t.description;
                d.appendChild(sd);
                $tb.append(d);

                sn.addEventListener('mousedown', function (e) {

                    mouseUpHandler(e);

                });

            });

            $(this.getDomElement('butStartTask')).show();

        };

        this.activateTask = function (task, force) {

            if (task && (!task.active) || force) {

                var self = this,
                    tc = this.testCase,
                    step = task.step,
                    tb = this.getDomElement('taskBar'),
                    div = $('div.d-cipher-task', tb)[step],
                    $div = $(div),
                    dw = ($('.step-number', div).outerWidth()),
                    ease = 'left 0.2s ease-out 0.15s',
                    i, t;

                this.taskEvents = this.db.getTaskEvents(this.testTask);
                $(this.getDomElement('butStartTask')).hide();

                for (i = 0; i < step; i++) {

                    t = tc[i];

                    this.setTaskDone(t, force);
                    t.active = false;

                    // Move previous tasks to the left
                    $($('div.d-cipher-task', tb)[i]).css({

                        left: dw * (i + 2) + 4,
                        transition: force ? '' : ease

                    }).children('.step-number').removeClass('active');

                }

                i++;
                for (il = tc.length; i < il; i++) {

                    this.deactivateTask(tc[i]);

                }

                $div.css({

                    left: dw * (step + 2) + 4,
                    transition: force ? '' : ease

                });

                task.active = true;
                self.currentTask = task;
                setTimeout(function () {

                    $('span.step-number', div).addClass('active');
                    self.setTaskUndone(task, force);
                    self.setTestProgressBar();

                }, 200);

            }

        };

        this.deactivateTask = function (task) {

            var tb = this.getDomElement('taskBar'),
                step = task.step,
                div = $('div', tb)[step],
                $div = $(div),
                $spn = $('span.step-number', div),
                left = window.innerWidth - $spn.outerWidth() * (this.testCase.length - step);

            task.active = false;
            this.setTaskUndone(task);
            $spn.removeClass('active').trigger('mouseout');
            $div.css({

                left: left,
                transition: 'left 0.2s ease-out 0.15s'

            });

        };

        this.syncTaskEvents = function (task) {

            var done = task.done;

            task.events.forEach(function (e) {

                e.done = done;

            });

        };

        this.setTaskDone = function (task, force) {

            if (task && (!task.done || force)) {

                var tb = this.getDomElement('taskBar'),
                    div = $('div.d-cipher-task', tb)[task.step];

                task.done = true;
                if (!force) {

                    this.syncTaskEvents(task);

                }
                $('span.step-number', div).html('✓');
                $('span.task-description', div).hide();

            }

        };

        this.setTaskUndone = function (task, force) {

            if (task && (task.done || force)) {

                var tb = this.getDomElement('taskBar'),
                    div = $('div.d-cipher-task', tb)[task.step];

                task.done = false;
                if (!force) {

                    this.syncTaskEvents(task);

                }
                $('span.step-number', div).html(task.step + 1);
                $('span.task-description', div).show();

            }

        };

        this.startTest = function () {

            var task = this.testTasks[0];

            this.activateTask(task);
            this.toggleRecMode();
            this.resetApp('test', task.events[0].location);

        };

        this.endOfTest = function () {

            var self = this,
                tb = this.getDomElement('taskBar');

            function endOfTest() {

                $('.d-cipher-task-done', tb).fadeOut();
                $(self.getDomElement('taskProgress')).hide();
                //window.location = self.testCase[0].events[0].location;

            }

            this.resetTasklist();
            this.appMode = 'record';
            this.toggleRecMode();
            $('.d-cipher-task-done', tb).fadeIn();
            setTimeout(endOfTest, 2000);

        };

        this.checkTaskCompletion = function () {

            var e = this.currentEvent,
                testCase = this.testCase,
                currentTask = this.currentTask,
                cStep = (currentTask.step + 1),
                el = e ? this.getElementByTreePath(e.treePath) : null,
                evts = currentTask ? currentTask.events : null;

            if (e && evts && evts.length) {

                for (var i = 0, len = evts.length; i < len; i++) {

                    var evt = evts[i],
                        treePath = e.treePath,
                        offset = $(el).offset(),
                        ww = window.innerWidth,
                        wh = window.innerHeight,
                        pX = pageXOffset,
                        pY = pageYOffset,
                        re = new RegExp('^' + evt.treePath),
                        vis;

                    vis = offset.top < (pY + wh) && offset.top > pY
                          && offset.left < pX + ww && offset.left > pX;

                    if (vis && evt.type === e.type
                        && treePath.match(re)
                        && evt.location === e.location) {

                        evt.done = true;
                        evt.testEvent = e;
                        evt.testEventIndex = i;
                        if (evt.alternate && evt.alternate.length) {

                            evt.alternate.forEach(function (ae) {

                                ae.done = true;
                                ae.testEvent = e;
                                ae.testEventIndex = i;

                            });

                        }
                        break;

                    }

                }

                if (!evts.filter(function (e) {

                        return !e.done;

                    }).length) {

                    if (cStep < testCase.length) {

                        this.activateTask(testCase[cStep]);

                    } else {

                        this.endOfTest();

                    }

                } else {

                    this.setTestProgressBar();

                }

            }

        };

        this.setTestProgressBar = function () {

            var tc = this.testCase,
                winW = window.innerWidth,
                butW = $('.step-number', this.getDomElement('taskBar')).width(),
                len = tc.length,
                finW = winW - butW * (len + 2);

            function getEventsInfo() {

                var done = 0,
                    total = 0;

                tc.forEach(function (t) {

                    total += t.events.length;
                    done += t.events.filter(function (e) {
                        return e.done
                    }).length;

                });

                return {total: total, done: done};

            }

            var ev = getEventsInfo(),
                ct = this.currentTask ? (3 + this.currentTask.step) : 0;

            $(this.getDomElement('taskProgress')).css({

                width: finW * ev.done / ev.total,
                left: butW * (ct),
                transition: 'width 0.2s ease-out 0.1s',
                display: 'block'

            });

        };

        this.resetApp = function (mode, path, restore) {

            localStorage.removeItem('Stroller.active');
            localStorage.removeItem('Stroller.name');
            localStorage.removeItem('Stroller.price');
            localStorage.removeItem('Stroller.stroller');
            localStorage.removeItem('Stroller.modules.Base');
            localStorage.removeItem('Stroller.modules.Frame');
            localStorage.removeItem('Stroller.modules.TF');
            sessionStorage.removeItem('basket');
            this.appMode = mode;
            if (!restore && path /*&& window.location.pathname !== path*/) {

                window.location.pathname = path;

            }

        };

        this.resetTasklist = function () {

            var $tb = $(this.getDomElement('taskBar')),
                tl = this.testCase,
                $tasks = $('div', $tb),
                w = $tb.outerHeight(),
                rp = window.innerWidth - w * (tl.length),
                d;

            tl.forEach(function (t, i) {

                t.done = false;
                t.active = false;
                t.events.forEach(function (e) {

                    e.done = false;

                });
                d = $tasks[i];
                $(d).css('left', rp + w * i);
                $('.step-number', d).html(i + 1).removeClass('active');

            });

            this.currentTask = null;
            this.currentEvent = null;
            this.setTestProgressBar();
            sessionStorage.removeItem('dcipherState');

        };

        this.highlightTimeLineEvent = function (e) {

            var evts = this.eventsUnderMouse || this.getEventsUnderMouse(e.clientX, e.clientY),
                evt = evts ? evts[0] : null,
                rec = evt ? this.getRecordById(evt.sessionId) : null,
                tl = this.getDomElement('timeline'),
                $tlc = $(this.getDomElement('timelineCircle'));

            if (rec && rec.active) {

                $tlc.css(this.getTimeLineCursorPars(evt.time, rec.duration)).show();

            } else if (e.target === tl) {

                $tlc.hide();

            }

        };

        this.getTimeLineCursorPars = function (time, duration) {

            var offsetRight = $(this.getDomElement('timelineInfo')).width(),
                tl = this.getDomElement('timeline'),
                width = window.innerWidth - this.timeLineOffsetLeft - offsetRight,
                pxs = width / duration,
                top = $(tl).height() / 2,
                left = this.timeLineOffsetLeft + pxs * time;

            return {

                top: top,
                left: left
            }

        };

        this.getTimeLineBracketsPars = function (time1, time2) {

            var rec = this.activeRecord,
                duration = rec ? rec.duration : 0,
                offsetRight = $(this.getDomElement('timelineInfo')).width(),
                pxs = (window.innerWidth - this.timeLineOffsetLeft - offsetRight) / duration,
                left = this.timeLineOffsetLeft + pxs * time1,
                width = this.timeLineOffsetLeft + pxs * time2 - left;

            this.timeBrackets = [time1, time2];
            this.startEventIndex = rec.events.find(function (e) {
                return e.time >= time1;
            }).index;
            this.endEventIndex = rec.events.find(function (e) {
                return e.time >= time2;
            }).index;
            return {width: width, left: left};
        };

        this.modifyTimelineFrame = function (e) {

            var $tb = $('#' + this.domId.timelineBrackets),
                t1 = this.timeBrackets[0],
                t2 = this.timeBrackets[1],
                tframe = t2 - t1,
                tppx = tframe / $tb.width(),
                dt = (e.clientX - this.tlMouse.x) * tppx;

            if (this.tlMouse.target === 'left-bracket' && t1 + dt >= 0) {

                t1 += dt;

            } else if (this.tlMouse.target === 'right-bracket' && t2 + dt <= this.activeRecord.duration) {

                t2 += dt;

            } else if (this.tlMouse.target === 'brackets') {

                t1 += dt;
                t2 += dt;

            }

            if (t1 >= 0 && t2 <= this.activeRecord.duration) {

                this.drawTLBrackets(t1, t2);

            }
            this.tlMouse.x = e.clientX;
            this.tlMouse.y = e.clientY;

        };

        this.toggleTestList = function () {

            $(this.getDomElement('testList')).toggle();

        };

        this.createTestList = function () {

            var self = this,
                $div = $('.tests', this.getDomElement('testList')),
                tst, inp, del;

            $div.children().remove();
            this.testCases.forEach(function (test) {

                tst = document.createElement('div');
                tst.className = 'test';
                tst.setAttribute('data-d-cipher-test-id', test.id);

                inp = document.createElement('input');
                inp.type = 'text';
                inp.name = 'testName';
                inp.className = 'test-name';
                inp.value = test.name;
                inp.disabled = true;
                inp.setAttribute('data-d-cipher-test-id', test.id);
                tst.appendChild(inp);

                del = document.createElement('div');
                del.id = 'btnDelTest-' + test.id;
                del.className = 'del';
                del.innerHTML = '&#10005;';
                del.title = dCipher.loc._Delete_test;
                del.setAttribute('data-d-cipher-test-id', test.id);
                tst.appendChild(del);

                $div.append(tst);

                tst.addEventListener('click', function () {

                    self.testCase = self.testCases.findBy('id', $(this).attr('data-d-cipher-test-id'));
                    self.createTaskList();
                    self.toggleTestList();
                    $(self.getDomElement('testName')).html(test.name).show();

                });

                tst.addEventListener('dblclick', function () {

                    $('input[type="text"]', this).attr('disabled', false).focus();

                });

                del.addEventListener('mouseup', function () {

                    self.deleteTest($(this).attr('data-d-cipher-test-id'));

                });

            });

        };

        this.getTestCaseSessionId = function (testCaseId) {

            return this.testCases.findBy('id', testCaseId).sessions.findBy('location', location.getDirName()).id;

        };

        this.deleteTest = function () {

        };

    }; // End of DCipher class

    var dCipher = new DCipher();

    function initDomElements() {

        var bdy = document.getElementsByTagName('body')[0],
            dMain = document.createElement('div'),
            link = document.createElement('link'),
            cnvDiv = document.createElement('div'),
            stat = document.createElement('div'),
            menu = document.createElement('div'),
            butRec = document.createElement('div'),
            rec = document.createElement('div'),
            butPlay = document.createElement('div'),
            play = document.createElement('div'),
            butTest = document.createElement('div'),
            test = document.createElement('div'),
            butList = document.createElement('div'),
            recs = document.createElement('div'),
            recList = document.createElement('div'),
            click = document.createElement('div'),
            dblclick = document.createElement('div'),
            evtHlt = document.createElement('div'),
            cursor = document.createElement('div'),
            mTT = document.createElement('div'),
            eInf = document.createElement('div'),
            tLine = document.createElement('div'),
            tlTT = document.createElement('div'),
            tlCursor = document.createElement('div'),
            tlBrackets = document.createElement('div'),
            tlLeftBracket = document.createElement('div'),
            tlRightBracket = document.createElement('div'),
            tlCircle = document.createElement('div'),
            tlInfo = document.createElement('div'),
            tlCnv = document.createElement('canvas'),
            topMenu = document.createElement('div'),
            taskBar = document.createElement('div'),
            taskProgress = document.createElement('span'),
            startTest = document.createElement('div'),
            testList = document.createElement('div'),
            testsCtrls = document.createElement('div'),
            tests = document.createElement('div'),
            testDone = document.createElement('div'),
            testName = document.createElement('span');

        // D-Cipher container
        dMain.id = dCipher.domId.container;
        bdy.appendChild(dMain);

        // Init styles
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.media = 'all';
        link.href = dCipher.baseURL + dCipher.cssURL;
        bdy.insertBefore(link, document.getElementById(dMain.id));

        // Init canvas holder
        cnvDiv.id = dCipher.domId.canvasHolder;
        cnvDiv.width = window.innerWidth;
        cnvDiv.height = window.innerHeight;
        dMain.appendChild(cnvDiv);

        // Status bar
        stat.id = dCipher.domId.stat;
        dMain.appendChild(stat);

        // Click spot
        click.id = dCipher.domId.click;
        cnvDiv.appendChild(click);

        // Double click spot
        dblclick.id = dCipher.domId.dblClick;
        cnvDiv.appendChild(dblclick);

        // Highlight event spot
        evtHlt.id = dCipher.domId.highlightEvent;
        cnvDiv.appendChild(evtHlt);

        // Cursor
        cursor.id = dCipher.domId.cursor;
        cnvDiv.appendChild(cursor);

        // Time line
        tLine.id = dCipher.domId.timeline;
        tlInfo.id = dCipher.domId.timelineInfo;
        tlCursor.id = dCipher.domId.timelineCursor;
        tlBrackets.id = dCipher.domId.timelineBrackets;
        tlBrackets.className = 'brackets';
        tlRightBracket.className = 'right-bracket';
        tlLeftBracket.className = 'left-bracket';
        tlCircle.id = dCipher.domId.timelineCircle;
        tlBrackets.appendChild(tlRightBracket);
        tlBrackets.appendChild(tlLeftBracket);
        tLine.appendChild(tlInfo);
        tLine.appendChild(tlCursor);
        tLine.appendChild(tlCnv);
        tLine.appendChild(tlBrackets);
        tLine.appendChild(tlCircle);
        cnvDiv.appendChild(tLine);

        // Time line event info popup
        tlTT.id = dCipher.domId.timelineTooltip;
        dMain.appendChild(tlTT);

        // Mouse tooltip
        mTT.id = dCipher.domId.mTooltip;
        dMain.appendChild(mTT);

        // Event info popup
        eInf.id = dCipher.domId.eventInfo;
        dMain.appendChild(eInf);

        // Record button
        butRec.id = dCipher.domId.butRecord;
        butRec.className = 'btn rec';
        butRec.title = dCipher.loc._Record_session;
        rec.className = 'rec';
        butRec.appendChild(rec);
        topMenu.appendChild(butRec);

        // Play button
        butPlay.id = dCipher.domId.butPlay;
        butPlay.className = 'btn play';
        butPlay.title = dCipher.loc._Play_record;
        play.className = 'play';
        //butPlay.style.display = 'none';
        butPlay.appendChild(play);
        topMenu.appendChild(butPlay);

        // Test button
        butTest.id = dCipher.domId.butTest;
        butTest.className = 'btn test';
        butTest.title = dCipher.loc._Test_list;
        test.className = 'test';
        butTest.appendChild(test);
        topMenu.appendChild(butTest);

        // Record list button
        butList.id = dCipher.domId.butList;
        butList.className = 'btn';
        recs.className = 'recs';
        butList.title = dCipher.loc._Show_records;
        butList.appendChild(recs);

        // Record list
        recList.id = dCipher.domId['records'];

        // Test list
        tests.className = 'tests';
        testsCtrls.className = 'tests-ctrls';
        testList.id = dCipher.domId['testList'];
        testList.appendChild(tests);
        testList.appendChild(testsCtrls);
        testName.id = dCipher.domId['testName'];
        testDone.className = 'd-cipher-task-done';
        testDone.innerHTML = dCipher.loc._Test_done;

        // D-Cipher menu
        menu.id = dCipher.domId.menu;
        //menu.appendChild(butRec);
        //menu.appendChild(butPlay);
        menu.appendChild(butList);
        dMain.appendChild(menu);
        dMain.appendChild(recList);
        dMain.appendChild(testList);

        // Top menu
        topMenu.id = dCipher.domId.topMenu;
        taskBar.id = dCipher.domId.taskBar;
        taskProgress.id = dCipher.domId.taskProgress;
        //taskBar.innerHTML = dCipher.loc._Start_task;
        startTest.id = dCipher.domId.butStartTask;
        startTest.className = 'start-test';
        startTest.innerHTML = dCipher.loc._Start_test;
        taskBar.appendChild(taskProgress);
        taskBar.appendChild(startTest);
        taskBar.appendChild(testDone);
        taskBar.appendChild(testName);
        topMenu.appendChild(taskBar);
        bdy.insertBefore(topMenu, bdy.firstChild);

        cnvDiv.addEventListener('click', function (e) {

            dCipher.canvasHolderClickHandler(e, dCipher);

        });

        cnvDiv.addEventListener('mousemove', function (e) {

            dCipher.showMouseTooltip(e);
            dCipher.highlightTimeLineEvent(e);

        });

        // Time line events listeners
        tLine.addEventListener('mousemove', function (e) {

            if (dCipher.tlMouse.down) {

                dCipher.modifyTimelineFrame(e);

            }
            dCipher.showTLTooltip(e);

        });

        tLine.addEventListener('click', function (e) {

            var evt = dCipher.getTimelineEvent(e),
                task = dCipher.getTimelineTask(e);

            if (evt) {

                dCipher.showTimelineEvent(evt.event);

            } else if (task) {

                dCipher.showTLTaskEvents(task);

            } else if (dCipher.activeRecord && (e.clientX < dCipher.timeLineOffsetLeft || e.target === dCipher.getDomElement('timelineInfo'))) {

                dCipher.drawSpiderGraph(dCipher.activeRecord.id);
                dCipher.resetTimeline(dCipher.activeRecord);

            }

        });

        tLine.addEventListener('mousedown', function (e) {

            dCipher.tlMouse.x = e.clientX;
            dCipher.tlMouse.x = e.clientX;
            dCipher.tlMouse.down = e.which === 1;
            dCipher.tlMouse.target = e.target.className;

        });

        tLine.addEventListener('mouseup', function (e) {

            //var evt = dCipher.activeRecord.events[dCipher.endEventIndex];

            dCipher.tlMouse.down = false;
            dCipher.tlMouse.target = '';
            dCipher.drawSpiderGraph(dCipher.activeRecord.id, dCipher.startEventIndex, dCipher.endEventIndex);

            /* TODO: if we really need to move to another screen?
             if (evt.location !== window.location.pathname) {

             dCipher.appMode = 'timeline';
             window.location = evt.location;

             }
             */

        });

        butRec.addEventListener('mouseup', function (e) {

            e.stopPropagation();
            if (dCipher.appMode === 'test') {

                dCipher.resetTasklist();

            }
            dCipher.toggleRecMode(e);

        });

        butTest.addEventListener('mouseup', function (e) {

            dCipher.toggleTestList();

        });

        butPlay.addEventListener('mouseup', function () {

            if (dCipher.appMode !== 'test' && dCipher.appMode !== 'record' && dCipher.activeRecord) {

                var sId = dCipher.sessionId,
                    $div = $('div', this);

                if ($div.hasClass('play')) {

                    if (sId) {

                        $div.removeClass('play').addClass('stop');
                        dCipher.playSession(sId);

                    }

                } else {

                    $div.removeClass('stop').addClass('play');

                    dCipher.appMode = '';
                    sessionStorage.removeItem('dcipherState');

                }

            }

        });

        butList.addEventListener('click', function () {

            dCipher.toggleRecList(this);

        });

        startTest.addEventListener('click', function () {

            dCipher.startTest();

        });

        window.addEventListener('click', function (e) {

            dCipher.saveEvent(e);

        });

        window.addEventListener('mousedown', function (e) {

            dCipher.saveEvent(e);

        });

        window.addEventListener('mouseup', function (e) {

            dCipher.saveEvent(e);

        });

        window.addEventListener('dragstart', function (e) {

            dCipher.saveEvent(e);

        });

        window.addEventListener('dragend', function (e) {

            dCipher.saveEvent(e);

        });

        window.addEventListener('keydown', function (e) {

            if (e.keyCode === 27) {

                dCipher.resetState();

            } else {

                dCipher.saveEvent(e);

            }

        });

        window.addEventListener('wheel', function (e) {

            dCipher.saveEvent(e);

        });

        window.addEventListener('resize', function (e) {

            var $recs = $(dCipher.getDomElement('records'));

            clearTimeout($recs.data('tid'));

            $recs.data('tid', setTimeout(function () {

                dCipher.createRecordList(e);

            }, 500));

        });

        window.addEventListener('beforeunload', function () {

            dCipher.saveState();

        });

        overridePrototype();

        /*
         var observer = new MutationObserver(function (mutations) {

         for (var i = 0, len = mutations.length; i < len; i++) {

         for (var j = 0, nl = mutations[i].addedNodes.length; j < nl; j++) {

         var node = mutations[i].addedNodes[j];

         for (var p in node) {

         if (node.className === 'colorpicker-hot-spot') {

         console.debug('########### NODE: ', node);

         }

         if (p.hasOwnProperty(p) && p.match(/^onmouse/i)){

         node.addEventListener(p.substring(2), function () {

         dCipher.saveEvent(e);

         });
         console.debug('====> MUTATION OBSERVER: added listener to node', node);

         }

         }

         }

         }

         });
         observer.observe(bdy, { childList: true });
         */

        setTimeout(checkJQuery, 500);

    }

    function checkJQuery(cnt) {

        cnt = isNaN(cnt) ? 50 : cnt;

        if (window.jQuery || window.$) {

            console.debug('Found jQuery, init IndexedDB...');
            initJQueryPlugins();
            if ($.indexedDB) {

                console.debug('IndexedDB initialized, initialize D-Cipher.');
                dCipher.init();

            }

        } else {

            cnt--;

            if (cnt) {

                checkJQuery(cnt);

            } else {

                loadJQuery();

            }

        }

    }

    function loadJQuery() {

        console.debug('Loading jQuery');

        var script = document.createElement('script');

        script.async = 'async';
        script.type = 'text/javascript';
        script.src = 'jquery-2.1.4.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
        setTimeout(checkJQuery, 500);

    }

    function overridePrototype() {

        Element.prototype._addEventListener = Element.prototype.addEventListener;
        Element.prototype.addEventListener = function (type, handler, useCapture) {

            useCapture = useCapture === void 0 ? false : useCapture;
            var node = this;

            node._addEventListener(type, handler, useCapture);

            if (!node.eventListenerList) {

                node.eventListenerList = {};

            }

            if (!node.eventListenerList[type]) {

                node.eventListenerList[type] = [];

                if (handler.toString().match(/stopPropagation|preventDefault/)
                    || type === 'mouseover' || type === 'mouseout'
                    || type === 'mouseenter' || type === 'mouseleave'
                    || type === 'mousedown' || type === 'mouseup'
                    || type.match(/scroll|wheel/i)
                ) {

                    node._addEventListener(type, function (e) {

                        dCipher.saveEvent(e);

                    });

                    //console.debug('JS listener --> Element: %s, Event added: ', this, type);
                    //console.debug('Handler: ', handler.toString());

                }

            }

            node.eventListenerList[type].push({

                type: type,
                handler: handler,
                useCapture: useCapture

            });

        };

        Element.prototype._removeEventListener = Element.prototype.removeEventListener;
        Element.prototype.removeEventListener = function (type, handler, useCapture) {

            var node = this;

            node._removeEventListener(type, handler, useCapture);

            if (node.eventListenerList && node.eventListenerList[type]) {

                node.eventListenerList[type] = node.eventListenerList[type].filter(function (listener) {

                    return listener.handler.toString() !== handler.toString();

                });

                if (node.eventListenerList[type].length === 0) {

                    delete node.eventListenerList[type];
                    node._removeEventListener(type, function (e) {

                        dCipher.saveEvent(e);

                    });

                }

            }

        };

        Array.prototype.last = function (array) {

            return array[array.length - 1];

        }

    }

    document.addEventListener('DOMContentLoaded', initDomElements);

})
(window, document);

// jQuery plugins
function initJQueryPlugins() {

    initColorPicker();
    initIndexedDB();

    $.extend({

        newGuid: function () {

            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

                var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);

            });

        }

    });

}
// Indexed DB
function initIndexedDB() {

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
    var IDBCursor = window.IDBCursor || window.webkitIDBCursor;

    IDBCursor.PREV = IDBCursor.PREV || "prev";
    IDBCursor.NEXT = IDBCursor.NEXT || "next";

    /**
     * Best to use the constant IDBTransaction since older version support numeric types while the latest spec
     * supports strings
     */
    var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

    function getDefaultTransaction(mode) {
        var result = null;
        switch (mode) {
            case 0:
            case 1:
            case "readwrite":
            case "readonly":
                result = mode;
                break;
            default:
                result = IDBTransaction.READ_WRITE || "readwrite";
        }
        return result;
    }

    $.extend({
        /**
         * The IndexedDB object used to open databases
         * @param {Object} dbName - name of the database
         * @param {Object} config - version, onupgradeneeded, onversionchange, schema
         */
        "indexedDB": function (dbName, config) {
            if (config) {
                // Parse the config argument
                if (typeof config === "number") config = {
                    "version": config
                };

                var version = config.version;
                if (config.schema && !version) {
                    var max = -1;
                    for (key in config.schema) {
                        max = max > key ? max : key;
                    }
                    version = config.version || max;
                }
            }

            var wrap = {
                "request": function (req, args) {
                    return $.Deferred(function (dfd) {
                        try {
                            var idbRequest = typeof req === "function" ? req(args) : req;
                            idbRequest.onsuccess = function (e) {
                                //console.log("Success", idbRequest, e, this);
                                dfd.resolveWith(idbRequest, [idbRequest.result, e]);
                            };
                            idbRequest.onerror = function (e) {
                                //console.log("Error", idbRequest, e, this);
                                dfd.rejectWith(idbRequest, [idbRequest.error, e]);
                            };
                            if (typeof idbRequest.onblocked !== "undefined" && idbRequest.onblocked === null) {
                                idbRequest.onblocked = function (e) {
                                    //console.log("Blocked", idbRequest, e, this);
                                    var res;
                                    try {
                                        res = idbRequest.result;
                                    }
                                    catch (e) {
                                        res = null; // Required for Older Chrome versions, accessing result causes error
                                    }
                                    dfd.notifyWith(idbRequest, [res, e]);
                                };
                            }
                            if (typeof idbRequest.onupgradeneeded !== "undefined" && idbRequest.onupgradeneeded === null) {
                                idbRequest.onupgradeneeded = function (e) {
                                    //console.log("Upgrade", idbRequest, e, this);
                                    dfd.notifyWith(idbRequest, [idbRequest.result, e]);
                                };
                            }
                        }
                        catch (e) {
                            e.name = "exception";
                            dfd.rejectWith(idbRequest, ["exception", e]);
                        }
                    });
                },
                // Wraps the IDBTransaction to return promises, and other dependent methods
                "transaction": function (idbTransaction) {
                    return {
                        "objectStore": function (storeName) {
                            try {
                                return wrap.objectStore(idbTransaction.objectStore(storeName));
                            }
                            catch (e) {
                                idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();
                                return wrap.objectStore(null);
                            }
                        },
                        "createObjectStore": function (storeName, storeParams) {
                            try {
                                return wrap.objectStore(idbTransaction.db.createObjectStore(storeName, storeParams));
                            }
                            catch (e) {
                                idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();
                            }
                        },
                        "deleteObjectStore": function (storeName) {
                            try {
                                idbTransaction.db.deleteObjectStore(storeName);
                            }
                            catch (e) {
                                idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();
                            }
                        },
                        "abort": function () {
                            idbTransaction.abort();
                        }
                    };
                },
                "objectStore": function (idbObjectStore) {
                    var result = {};
                    // Define CRUD operations
                    var crudOps = ["add", "put", "get", "delete", "clear", "count"];
                    for (var i = 0; i < crudOps.length; i++) {
                        result[crudOps[i]] = (function (op) {
                            return function () {
                                return wrap.request(function (args) {
                                    return idbObjectStore[op].apply(idbObjectStore, args);
                                }, arguments);
                            };
                        })(crudOps[i]);
                    }

                    result.each = function (callback, range, direction) {
                        return wrap.cursor(function () {
                            if (direction) {
                                return idbObjectStore.openCursor(wrap.range(range), direction);
                            } else {
                                return idbObjectStore.openCursor(wrap.range(range));
                            }
                        }, callback);
                    };

                    result.index = function (name) {
                        return wrap.index(function () {
                            return idbObjectStore.index(name);
                        });
                    };

                    result.createIndex = function (prop, options, indexName) {
                        if (arguments.length === 2 && typeof options === "string") {
                            indexName = arguments[1];
                            options = null;
                        }
                        if (!indexName) {
                            indexName = prop;
                        }
                        return wrap.index(function () {
                            return idbObjectStore.createIndex(indexName, prop, options);
                        });
                    };

                    result.deleteIndex = function (indexName) {
                        return idbObjectStore.deleteIndex(indexName);
                    };

                    return result;
                },

                "range": function (r) {
                    if ($.isArray(r)) {
                        if (r.length === 1) {
                            return IDBKeyRange.only(r[0]);
                        } else {
                            return IDBKeyRange.bound(r[0], r[1], r[2] || true, r[3] || true);
                        }
                    } else if (typeof r === "undefined") {
                        return null;
                    } else {
                        return r;
                    }
                },

                "cursor": function (idbCursor, callback) {
                    return $.Deferred(function (dfd) {
                        try {
                            //console.log("Cursor request created", idbCursor);
                            var cursorReq = typeof idbCursor === "function" ? idbCursor() : idbCursor;
                            cursorReq.onsuccess = function (e) {
                                //console.log("Cursor successful");
                                if (!cursorReq.result) {
                                    dfd.resolveWith(cursorReq, [null, e]);
                                    return;
                                }
                                var elem = {
                                    // Delete, update do not move
                                    "delete": function () {
                                        return wrap.request(function () {
                                            return cursorReq.result["delete"]();
                                        });
                                    },
                                    "update": function (data) {
                                        return wrap.request(function () {
                                            return cursorReq.result["update"](data);
                                        });
                                    },
                                    "next": function (key) {
                                        this.data = key;
                                    },
                                    "key": cursorReq.result.key,
                                    "value": cursorReq.result.value
                                };
                                //console.log("Cursor in progress", elem, e);
                                dfd.notifyWith(cursorReq, [elem, e]);
                                var result = callback.apply(cursorReq, [elem]);
                                //console.log("Iteration function returned", result);
                                try {
                                    if (result === false) {
                                        dfd.resolveWith(cursorReq, [null, e]);
                                    } else if (typeof result === "number") {
                                        cursorReq.result["advance"].apply(cursorReq.result, [result]);
                                    } else {
                                        if (elem.data) cursorReq.result["continue"].apply(cursorReq.result, [elem.data]);
                                        else cursorReq.result["continue"]();
                                    }
                                }
                                catch (e) {
                                    //console.log("Exception when trying to advance cursor", cursorReq, e);
                                    dfd.rejectWith(cursorReq, [cursorReq.result, e]);
                                }
                            };
                            cursorReq.onerror = function (e) {
                                //console.log("Cursor request errored out", e);
                                dfd.rejectWith(cursorReq, [cursorReq.result, e]);
                            };
                        }
                        catch (e) {
                            //console.log("An exception occured inside cursor", cursorReq, e);
                            e.type = "exception";
                            dfd.rejectWith(cursorReq, [null, e]);
                        }
                    });
                },

                "index": function (index) {
                    try {
                        var idbIndex = (typeof index === "function" ? index() : index);
                    }
                    catch (e) {
                        idbIndex = null;
                    }
                    //console.logidbIndex, index);
                    return {
                        "each": function (callback, range, direction) {
                            return wrap.cursor(function () {
                                if (direction) {
                                    return idbIndex.openCursor(wrap.range(range), direction);
                                } else {
                                    return idbIndex.openCursor(wrap.range(range));
                                }

                            }, callback);
                        },
                        "eachKey": function (callback, range, direction) {
                            return wrap.cursor(function () {
                                if (direction) {
                                    return idbIndex.openKeyCursor(wrap.range(range), direction);
                                } else {
                                    return idbIndex.openKeyCursor(wrap.range(range));
                                }
                            }, callback);
                        },
                        "get": function (key) {
                            if (typeof idbIndex.get === "function") {
                                return wrap.request(idbIndex.get(key));
                            } else {
                                return idbIndex.openCursor(wrap.range(key));
                            }
                        },
                        "getKey": function (key) {
                            if (typeof idbIndex.getKey === "function") {
                                return wrap.request(idbIndex.getKey(key));
                            } else {
                                return idbIndex.openKeyCursor(wrap.range(key));
                            }
                        }
                    };
                }
            };

            // Start with opening the database
            var dbPromise = wrap.request(function () {
                //console.log("Trying to open DB with", version);
                return version ? indexedDB.open(dbName, parseInt(version)) : indexedDB.open(dbName);
            });
            dbPromise.then(function (db, e) {
                //console.log("DB opened at", db.version);
                db.onversionchange = function () {
                    // Try to automatically close the database if there is a version change request
                    if (!(config && config.onversionchange && config.onversionchange() !== false)) {
                        db.close();
                    }
                };
            }, function (error, e) {
                //console.logerror, e);
                // Nothing much to do if an error occurs
            }, function (db, e) {
                if (e && e.type === "upgradeneeded") {
                    if (config && config.schema) {
                        // Assuming that version is always an integer
                        //console.log("Upgrading DB to ", db.version);
                        for (var i = e.oldVersion + 1; i <= e.newVersion; i++) {
                            typeof config.schema[i] === "function" && config.schema[i].call(this, wrap.transaction(this.transaction));
                        }
                    }
                    if (config && typeof config.upgrade === "function") {
                        config.upgrade.call(this, wrap.transaction(this.transaction));
                    }
                }
            });

            return $.extend(dbPromise, {
                "cmp": function (key1, key2) {
                    return indexedDB.cmp(key1, key2);
                },
                "deleteDatabase": function () {
                    // Kinda looks ugly coz DB is opened before it needs to be deleted.
                    // Blame it on the API
                    return $.Deferred(function (dfd) {
                        dbPromise.then(function (db, e) {
                            db.close();
                            wrap.request(function () {
                                return indexedDB.deleteDatabase(dbName);
                            }).then(function (result, e) {
                                dfd.resolveWith(this, [result, e]);
                            }, function (error, e) {
                                dfd.rejectWith(this, [error, e]);
                            }, function (db, e) {
                                dfd.notifyWith(this, [db, e]);
                            });
                        }, function (error, e) {
                            dfd.rejectWith(this, [error, e]);
                        }, function (db, e) {
                            dfd.notifyWith(this, [db, e]);
                        });
                    });
                },
                "transaction": function (storeNames, mode) {
                    !$.isArray(storeNames) && (storeNames = [storeNames]);
                    mode = getDefaultTransaction(mode);
                    return $.Deferred(function (dfd) {
                        dbPromise.then(function (db, e) {
                            var idbTransaction;
                            try {
                                //console.log("DB Opened, now trying to create a transaction", storeNames, mode);
                                idbTransaction = db.transaction(storeNames, mode);
                                //console.log("Created a transaction", idbTransaction, mode, storeNames);
                                idbTransaction.onabort = idbTransaction.onerror = function (e) {
                                    dfd.rejectWith(idbTransaction, [e]);
                                };
                                idbTransaction.oncomplete = function (e) {
                                    dfd.resolveWith(idbTransaction, [e]);
                                };
                            }
                            catch (e) {
                                //console.log("Creating a traction failed", e, storeNames, mode, this);
                                e.type = "exception";
                                dfd.rejectWith(this, [e]);
                                return;
                            }
                            try {
                                dfd.notifyWith(idbTransaction, [wrap.transaction(idbTransaction)]);
                            }
                            catch (e) {
                                e.type = "exception";
                                dfd.rejectWith(this, [e]);
                            }
                        }, function (err, e) {
                            dfd.rejectWith(this, [e, err]);
                        }, function (res, e) {
                            //console.log("Database open is blocked or upgrade needed", res, e.type);
                            //dfd.notifyWith(this, ["", e]);
                        });

                    });
                },
                "objectStore": function (storeName, mode) {
                    var me = this, result = {};

                    function op(callback) {
                        return $.Deferred(function (dfd) {
                            function onTransactionProgress(trans, callback) {
                                try {
                                    //console.log("Finally, returning the object store", trans);
                                    callback(trans.objectStore(storeName)).then(function (result, e) {
                                        dfd.resolveWith(this, [result, e]);
                                    }, function (err, e) {
                                        dfd.rejectWith(this, [err, e]);
                                    });
                                }
                                catch (e) {
                                    //console.log("Duh, an exception occured", e);
                                    e.name = "exception";
                                    dfd.rejectWith(trans, [e, e]);
                                }
                            }

                            me.transaction(storeName, getDefaultTransaction(mode)).then(function () {
                                //console.log("Transaction completed");
                                // Nothing to do when transaction is complete
                            }, function (err, e) {
                                // If transaction fails, CrudOp fails
                                if (err.code === err.NOT_FOUND_ERR && (mode === true || typeof mode === "object")) {
                                    //console.log("Object Not found, so will try to create one now");
                                    var db = this.result;
                                    db.close();
                                    dbPromise = wrap.request(function () {
                                        //console.log("Now trying to open the database again", db.version);
                                        return indexedDB.open(dbName, (parseInt(db.version, 10) || 1) + 1);
                                    });
                                    dbPromise.then(function (db, e) {
                                        //console.log("Database opened, tto open transaction", db.version);
                                        db.onversionchange = function () {
                                            // Try to automatically close the database if there is a version change request
                                            if (!(config && config.onversionchange && config.onversionchange() !== false)) {
                                                db.close();
                                            }
                                        };
                                        me.transaction(storeName, getDefaultTransaction(mode)).then(function () {
                                            //console.log("Transaction completed when trying to create object store");
                                            // Nothing much to do
                                        }, function (err, e) {
                                            dfd.rejectWith(this, [err, e]);
                                        }, function (trans, e) {
                                            //console.log("Transaction in progress, when object store was not found", this, trans, e);
                                            onTransactionProgress(trans, callback);
                                        });
                                    }, function (err, e) {
                                        dfd.rejectWith(this, [err, e]);
                                    }, function (db, e) {
                                        if (e.type === "upgradeneeded") {
                                            try {
                                                //console.log("Now trying to create an object store", e.type);
                                                db.createObjectStore(storeName, mode === true ? {
                                                    "autoIncrement": true
                                                } : mode);
                                                //console.log("Object store created", storeName, db);
                                            }
                                            catch (ex) {
                                                //console.log("Exception when trying ot create a new object store", ex);
                                                dfd.rejectWith(this, [ex, e]);
                                            }
                                        }
                                    });
                                } else {
                                    //console.log("Error in transaction inside object store", err);
                                    dfd.rejectWith(this, [err, e]);
                                }
                            }, function (trans) {
                                //console.log("Transaction is in progress", trans);
                                onTransactionProgress(trans, callback);
                            });
                        });
                    }

                    function crudOp(opName, args) {
                        return op(function (wrappedObjectStore) {
                            return wrappedObjectStore[opName].apply(wrappedObjectStore, args);
                        });
                    }

                    function indexOp(opName, indexName, args) {
                        return op(function (wrappedObjectStore) {
                            var index = wrappedObjectStore.index(indexName);
                            return index[opName].apply(index[opName], args);
                        });
                    }

                    var crud = ["add", "delete", "get", "put", "clear", "count", "each"];
                    for (var i = 0; i < crud.length; i++) {
                        result[crud[i]] = (function (op) {
                            return function () {
                                return crudOp(op, arguments);
                            };
                        })(crud[i]);
                    }

                    result.index = function (indexName) {
                        return {
                            "each": function (callback, range, direction) {
                                return indexOp("each", indexName, [callback, range, direction]);
                            },
                            "eachKey": function (callback, range, direction) {
                                return indexOp("eachKey", indexName, [callback, range, direction]);
                            },
                            "get": function (key) {
                                return indexOp("get", indexName, [key]);
                            },
                            "getKey": function (key) {
                                return indexOp("getKey", indexName, [key]);
                            }
                        };
                    };

                    return result;
                }
            });
        }
    });

    $.indexedDB.IDBCursor = IDBCursor;
    $.indexedDB.IDBTransaction = IDBTransaction;
    $.idb = $.indexedDB;
}
// Bootstrap color picker
/*!
 * Bootstrap Colorpicker
 * http://mjolnic.github.io/bootstrap-colorpicker/
 *
 * Originally written by (c) 2012 Stefan Petre
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 * @todo Update DOCS
 */

/*
 (function(factory) {
 "use strict";
 if (typeof exports === 'object') {
 module.exports = factory(window.jQuery);
 } else if (typeof define === 'function' && define.amd) {
 define(['jquery'], factory);
 } else if (window.jQuery && !window.jQuery.fn.colorpicker) {
 factory(window.jQuery);
 }
 }
 */

function initColorPicker() {
    'use strict';

    // Color object
    var Color = function (val, customColors) {
        this.value = {
            h: 0,
            s: 0,
            b: 0,
            a: 1
        };
        this.origFormat = null; // original string format
        if (customColors) {
            $.extend(this.colors, customColors);
        }
        if (val) {
            if (val.toLowerCase !== undefined) {
                // cast to string
                val = val + '';
                this.setColor(val);
            } else if (val.h !== undefined) {
                this.value = val;
            }
        }
    };

    Color.prototype = {
        constructor: Color,
        // 140 predefined colors from the HTML Colors spec
        colors: {
            "aliceblue": "#f0f8ff",
            "antiquewhite": "#faebd7",
            "aqua": "#00ffff",
            "aquamarine": "#7fffd4",
            "azure": "#f0ffff",
            "beige": "#f5f5dc",
            "bisque": "#ffe4c4",
            "black": "#000000",
            "blanchedalmond": "#ffebcd",
            "blue": "#0000ff",
            "blueviolet": "#8a2be2",
            "brown": "#a52a2a",
            "burlywood": "#deb887",
            "cadetblue": "#5f9ea0",
            "chartreuse": "#7fff00",
            "chocolate": "#d2691e",
            "coral": "#ff7f50",
            "cornflowerblue": "#6495ed",
            "cornsilk": "#fff8dc",
            "crimson": "#dc143c",
            "cyan": "#00ffff",
            "darkblue": "#00008b",
            "darkcyan": "#008b8b",
            "darkgoldenrod": "#b8860b",
            "darkgray": "#a9a9a9",
            "darkgreen": "#006400",
            "darkkhaki": "#bdb76b",
            "darkmagenta": "#8b008b",
            "darkolivegreen": "#556b2f",
            "darkorange": "#ff8c00",
            "darkorchid": "#9932cc",
            "darkred": "#8b0000",
            "darksalmon": "#e9967a",
            "darkseagreen": "#8fbc8f",
            "darkslateblue": "#483d8b",
            "darkslategray": "#2f4f4f",
            "darkturquoise": "#00ced1",
            "darkviolet": "#9400d3",
            "deeppink": "#ff1493",
            "deepskyblue": "#00bfff",
            "dimgray": "#696969",
            "dodgerblue": "#1e90ff",
            "firebrick": "#b22222",
            "floralwhite": "#fffaf0",
            "forestgreen": "#228b22",
            "fuchsia": "#ff00ff",
            "gainsboro": "#dcdcdc",
            "ghostwhite": "#f8f8ff",
            "gold": "#ffd700",
            "goldenrod": "#daa520",
            "gray": "#808080",
            "green": "#008000",
            "greenyellow": "#adff2f",
            "honeydew": "#f0fff0",
            "hotpink": "#ff69b4",
            "indianred": "#cd5c5c",
            "indigo": "#4b0082",
            "ivory": "#fffff0",
            "khaki": "#f0e68c",
            "lavender": "#e6e6fa",
            "lavenderblush": "#fff0f5",
            "lawngreen": "#7cfc00",
            "lemonchiffon": "#fffacd",
            "lightblue": "#add8e6",
            "lightcoral": "#f08080",
            "lightcyan": "#e0ffff",
            "lightgoldenrodyellow": "#fafad2",
            "lightgrey": "#d3d3d3",
            "lightgreen": "#90ee90",
            "lightpink": "#ffb6c1",
            "lightsalmon": "#ffa07a",
            "lightseagreen": "#20b2aa",
            "lightskyblue": "#87cefa",
            "lightslategray": "#778899",
            "lightsteelblue": "#b0c4de",
            "lightyellow": "#ffffe0",
            "lime": "#00ff00",
            "limegreen": "#32cd32",
            "linen": "#faf0e6",
            "magenta": "#ff00ff",
            "maroon": "#800000",
            "mediumaquamarine": "#66cdaa",
            "mediumblue": "#0000cd",
            "mediumorchid": "#ba55d3",
            "mediumpurple": "#9370d8",
            "mediumseagreen": "#3cb371",
            "mediumslateblue": "#7b68ee",
            "mediumspringgreen": "#00fa9a",
            "mediumturquoise": "#48d1cc",
            "mediumvioletred": "#c71585",
            "midnightblue": "#191970",
            "mintcream": "#f5fffa",
            "mistyrose": "#ffe4e1",
            "moccasin": "#ffe4b5",
            "navajowhite": "#ffdead",
            "navy": "#000080",
            "oldlace": "#fdf5e6",
            "olive": "#808000",
            "olivedrab": "#6b8e23",
            "orange": "#ffa500",
            "orangered": "#ff4500",
            "orchid": "#da70d6",
            "palegoldenrod": "#eee8aa",
            "palegreen": "#98fb98",
            "paleturquoise": "#afeeee",
            "palevioletred": "#d87093",
            "papayawhip": "#ffefd5",
            "peachpuff": "#ffdab9",
            "peru": "#cd853f",
            "pink": "#ffc0cb",
            "plum": "#dda0dd",
            "powderblue": "#b0e0e6",
            "purple": "#800080",
            "red": "#ff0000",
            "rosybrown": "#bc8f8f",
            "royalblue": "#4169e1",
            "saddlebrown": "#8b4513",
            "salmon": "#fa8072",
            "sandybrown": "#f4a460",
            "seagreen": "#2e8b57",
            "seashell": "#fff5ee",
            "sienna": "#a0522d",
            "silver": "#c0c0c0",
            "skyblue": "#87ceeb",
            "slateblue": "#6a5acd",
            "slategray": "#708090",
            "snow": "#fffafa",
            "springgreen": "#00ff7f",
            "steelblue": "#4682b4",
            "tan": "#d2b48c",
            "teal": "#008080",
            "thistle": "#d8bfd8",
            "tomato": "#ff6347",
            "turquoise": "#40e0d0",
            "violet": "#ee82ee",
            "wheat": "#f5deb3",
            "white": "#ffffff",
            "whitesmoke": "#f5f5f5",
            "yellow": "#ffff00",
            "yellowgreen": "#9acd32",
            "transparent": "transparent"
        },
        _sanitizeNumber: function (val) {
            if (typeof val === 'number') {
                return val;
            }
            if (isNaN(val) || (val === null) || (val === '') || (val === undefined)) {
                return 1;
            }
            if (val.toLowerCase !== undefined) {
                return parseFloat(val);
            }
            return 1;
        },
        isTransparent: function (strVal) {
            if (!strVal) {
                return false;
            }
            strVal = strVal.toLowerCase().trim();
            return (strVal === 'transparent') || (strVal.match(/#?00000000/)) || (strVal.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/));
        },
        rgbaIsTransparent: function (rgba) {
            return ((rgba.r === 0) && (rgba.g === 0) && (rgba.b === 0) && (rgba.a === 0));
        },
        //parse a string to HSB
        setColor: function (strVal) {
            strVal = strVal.toLowerCase().trim();
            if (strVal) {
                if (this.isTransparent(strVal)) {
                    this.value = {
                        h: 0,
                        s: 0,
                        b: 0,
                        a: 0
                    };
                } else {
                    this.value = this.stringToHSB(strVal) || {
                            h: 0,
                            s: 0,
                            b: 0,
                            a: 1
                        }; // if parser fails, defaults to black
                }
            }
        },
        stringToHSB: function (strVal) {
            strVal = strVal.toLowerCase();
            var alias;
            if (typeof this.colors[strVal] !== 'undefined') {
                strVal = this.colors[strVal];
                alias = 'alias';
            }
            var that = this,
                result = false;
            $.each(this.stringParsers, function (i, parser) {
                var match = parser.re.exec(strVal),
                    values = match && parser.parse.apply(that, [match]),
                    format = alias || parser.format || 'rgba';
                if (values) {
                    if (format.match(/hsla?/)) {
                        result = that.RGBtoHSB.apply(that, that.HSLtoRGB.apply(that, values));
                    } else {
                        result = that.RGBtoHSB.apply(that, values);
                    }
                    that.origFormat = format;
                    return false;
                }
                return true;
            });
            return result;
        },
        setHue: function (h) {
            this.value.h = 1 - h;
        },
        setSaturation: function (s) {
            this.value.s = s;
        },
        setBrightness: function (b) {
            this.value.b = 1 - b;
        },
        setAlpha: function (a) {
            this.value.a = parseInt((1 - a) * 100, 10) / 100;
        },
        toRGB: function (h, s, b, a) {
            if (!h) {
                h = this.value.h;
                s = this.value.s;
                b = this.value.b;
            }
            h *= 360;
            var R, G, B, X, C;
            h = (h % 360) / 60;
            C = b * s;
            X = C * (1 - Math.abs(h % 2 - 1));
            R = G = B = b - C;

            h = ~~h;
            R += [C, X, 0, 0, X, C][h];
            G += [X, C, C, X, 0, 0][h];
            B += [0, 0, X, C, C, X][h];
            return {
                r: Math.round(R * 255),
                g: Math.round(G * 255),
                b: Math.round(B * 255),
                a: a || this.value.a
            };
        },
        toHex: function (h, s, b, a) {
            var rgb = this.toRGB(h, s, b, a);
            if (this.rgbaIsTransparent(rgb)) {
                return 'transparent';
            }
            return '#' + ((1 << 24) | (parseInt(rgb.r) << 16) | (parseInt(rgb.g) << 8) | parseInt(rgb.b)).toString(16).substr(1);
        },
        toHSL: function (h, s, b, a) {
            h = h || this.value.h;
            s = s || this.value.s;
            b = b || this.value.b;
            a = a || this.value.a;

            var H = h,
                L = (2 - s) * b,
                S = s * b;
            if (L > 0 && L <= 1) {
                S /= L;
            } else {
                S /= 2 - L;
            }
            L /= 2;
            if (S > 1) {
                S = 1;
            }
            return {
                h: isNaN(H) ? 0 : H,
                s: isNaN(S) ? 0 : S,
                l: isNaN(L) ? 0 : L,
                a: isNaN(a) ? 0 : a
            };
        },
        toAlias: function (r, g, b, a) {
            var rgb = this.toHex(r, g, b, a);
            for (var alias in this.colors) {
                if (this.colors[alias] === rgb) {
                    return alias;
                }
            }
            return false;
        },
        RGBtoHSB: function (r, g, b, a) {
            r /= 255;
            g /= 255;
            b /= 255;

            var H, S, V, C;
            V = Math.max(r, g, b);
            C = V - Math.min(r, g, b);
            H = (C === 0 ? null :
                 V === r ? (g - b) / C :
                 V === g ? (b - r) / C + 2 :
                 (r - g) / C + 4
            );
            H = ((H + 360) % 6) * 60 / 360;
            S = C === 0 ? 0 : C / V;
            return {
                h: this._sanitizeNumber(H),
                s: S,
                b: V,
                a: this._sanitizeNumber(a)
            };
        },
        HueToRGB: function (p, q, h) {
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
            if ((h * 6) < 1) {
                return p + (q - p) * h * 6;
            } else if ((h * 2) < 1) {
                return q;
            } else if ((h * 3) < 2) {
                return p + (q - p) * ((2 / 3) - h) * 6;
            } else {
                return p;
            }
        },
        HSLtoRGB: function (h, s, l, a) {
            if (s < 0) {
                s = 0;
            }
            var q;
            if (l <= 0.5) {
                q = l * (1 + s);
            } else {
                q = l + s - (l * s);
            }

            var p = 2 * l - q;

            var tr = h + (1 / 3);
            var tg = h;
            var tb = h - (1 / 3);

            var r = Math.round(this.HueToRGB(p, q, tr) * 255);
            var g = Math.round(this.HueToRGB(p, q, tg) * 255);
            var b = Math.round(this.HueToRGB(p, q, tb) * 255);
            return [r, g, b, this._sanitizeNumber(a)];
        },
        toString: function (format) {
            format = format || 'rgba';
            var c = false;
            switch (format) {
                case 'rgb':
                {
                    c = this.toRGB();
                    if (this.rgbaIsTransparent(c)) {
                        return 'transparent';
                    }
                    return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
                }
                    break;
                case 'rgba':
                {
                    c = this.toRGB();
                    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
                }
                    break;
                case 'hsl':
                {
                    c = this.toHSL();
                    return 'hsl(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%)';
                }
                    break;
                case 'hsla':
                {
                    c = this.toHSL();
                    return 'hsla(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%,' + c.a + ')';
                }
                    break;
                case 'hex':
                {
                    return this.toHex();
                }
                    break;
                case 'alias':
                    return this.toAlias() || this.toHex();
                default:
                {
                    return c;
                }
                    break;
            }
        },
        // a set of RE's that can match strings and generate color tuples.
        // from John Resig color plugin
        // https://github.com/jquery/jquery-color/
        stringParsers: [{
            re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
            format: 'rgb',
            parse: function (execResult) {
                return [
                    execResult[1],
                    execResult[2],
                    execResult[3],
                    1
                ];
            }
        }, {
            re: /rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
            format: 'rgb',
            parse: function (execResult) {
                return [
                    2.55 * execResult[1],
                    2.55 * execResult[2],
                    2.55 * execResult[3],
                    1
                ];
            }
        }, {
            re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            format: 'rgba',
            parse: function (execResult) {
                return [
                    execResult[1],
                    execResult[2],
                    execResult[3],
                    execResult[4]
                ];
            }
        }, {
            re: /rgba\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            format: 'rgba',
            parse: function (execResult) {
                return [
                    2.55 * execResult[1],
                    2.55 * execResult[2],
                    2.55 * execResult[3],
                    execResult[4]
                ];
            }
        }, {
            re: /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
            format: 'hsl',
            parse: function (execResult) {
                return [
                    execResult[1] / 360,
                    execResult[2] / 100,
                    execResult[3] / 100,
                    execResult[4]
                ];
            }
        }, {
            re: /hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            format: 'hsla',
            parse: function (execResult) {
                return [
                    execResult[1] / 360,
                    execResult[2] / 100,
                    execResult[3] / 100,
                    execResult[4]
                ];
            }
        }, {
            re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            format: 'hex',
            parse: function (execResult) {
                return [
                    parseInt(execResult[1], 16),
                    parseInt(execResult[2], 16),
                    parseInt(execResult[3], 16),
                    1
                ];
            }
        }, {
            re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
            format: 'hex',
            parse: function (execResult) {
                return [
                    parseInt(execResult[1] + execResult[1], 16),
                    parseInt(execResult[2] + execResult[2], 16),
                    parseInt(execResult[3] + execResult[3], 16),
                    1
                ];
            }
        }
        ],
        colorNameToHex: function (name) {
            if (typeof this.colors[name.toLowerCase()] !== 'undefined') {
                return this.colors[name.toLowerCase()];
            }
            return false;
        }
    };

    var defaults = {
        horizontal: false, // horizontal mode layout ?
        inline: false, //forces to show the colorpicker as an inline element
        color: false, //forces a color
        format: false, //forces a format
        input: 'input', // children input selector
        container: false, // container selector
        component: '.add-on, .input-group-addon', // children component selector
        sliders: {
            saturation: {
                maxLeft: 100,
                maxTop: 100,
                callLeft: 'setSaturation',
                callTop: 'setBrightness'
            },
            hue: {
                maxLeft: 0,
                maxTop: 100,
                callLeft: false,
                callTop: 'setHue'
            },
            alpha: {
                maxLeft: 0,
                maxTop: 100,
                callLeft: false,
                callTop: 'setAlpha'
            }
        },
        slidersHorz: {
            saturation: {
                maxLeft: 100,
                maxTop: 100,
                callLeft: 'setSaturation',
                callTop: 'setBrightness'
            },
            hue: {
                maxLeft: 100,
                maxTop: 0,
                callLeft: 'setHue',
                callTop: false
            },
            alpha: {
                maxLeft: 100,
                maxTop: 0,
                callLeft: 'setAlpha',
                callTop: false
            }
        },
        template: '<div class="bs-colorpicker dropdown-menu">' +
                  '<div class="bs-colorpicker-saturation"><i><b></b></i></div>' +
                  '<div class="bs-colorpicker-hue"><i></i></div>' +
                  '<div class="bs-colorpicker-alpha"><i></i></div>' +
                  '<div class="bs-colorpicker-color"><div /></div>' +
                  '<div class="bs-colorpicker-selectors"></div>' +
                  '</div>',
        align: 'right',
        customClass: null,
        colorSelectors: null
    };

    var Colorpicker = function (element, options) {
        this.element = $(element).addClass('bs-colorpicker-element');
        this.options = $.extend(true, {}, defaults, this.element.data(), options);
        this.component = this.options.component;
        this.component = (this.component !== false) ? this.element.find(this.component) : false;
        if (this.component && (this.component.length === 0)) {
            this.component = false;
        }
        this.container = (this.options.container === true) ? this.element : this.options.container;
        this.container = (this.container !== false) ? $(this.container) : false;

        // Is the element an input? Should we search inside for any input?
        this.input = this.element.is('input') ? this.element : (this.options.input ?
                                                                this.element.find(this.options.input) : false);
        if (this.input && (this.input.length === 0)) {
            this.input = false;
        }
        // Set HSB color
        this.color = new Color(this.options.color !== false ? this.options.color : this.getValue(), this.options.colorSelectors);
        this.format = this.options.format !== false ? this.options.format : this.color.origFormat;

        // Setup picker
        this.picker = $(this.options.template);
        if (this.options.customClass) {
            this.picker.addClass(this.options.customClass);
        }
        if (this.options.inline) {
            this.picker.addClass('bs-colorpicker-inline bs-colorpicker-visible');
        } else {
            this.picker.addClass('bs-colorpicker-hidden');
        }
        if (this.options.horizontal) {
            this.picker.addClass('bs-colorpicker-horizontal');
        }
        if (this.format === 'rgba' || this.format === 'hsla' || this.options.format === false) {
            this.picker.addClass('bs-colorpicker-with-alpha');
        }
        if (this.options.align === 'right') {
            this.picker.addClass('bs-colorpicker-right');
        }
        if (this.options.colorSelectors) {
            var colorpicker = this;
            $.each(this.options.colorSelectors, function (name, color) {
                var $btn = $('<i />').css('background-color', color).data('class', name);
                $btn.click(function () {
                    colorpicker.setValue($(this).css('background-color'));
                });
                colorpicker.picker.find('.bs-colorpicker-selectors').append($btn);
            });
            this.picker.find('.bs-colorpicker-selectors').show();
        }
        this.picker.on('mousedown.bs-colorpicker touchstart.bs-colorpicker', $.proxy(this.mousedown, this));
        this.picker.appendTo(this.container ? this.container : $('body'));

        // Bind events
        if (this.input !== false) {
            this.input.on({
                'keyup.bs-colorpicker': $.proxy(this.keyup, this)
            });
            this.input.on({
                'change.bs-colorpicker': $.proxy(this.change, this)
            });
            if (this.component === false) {
                this.element.on({
                    'focus.bs-colorpicker': $.proxy(this.show, this)
                });
            }
            if (this.options.inline === false) {
                this.element.on({
                    'focusout.bs-colorpicker': $.proxy(this.hide, this)
                });
            }
        }

        if (this.component !== false) {
            this.component.on({
                'click.bs-colorpicker': $.proxy(this.show, this)
            });
        }

        if ((this.input === false) && (this.component === false)) {
            this.element.on({
                'click.bs-colorpicker': $.proxy(this.show, this)
            });
        }

        // for HTML5 input[type='color']
        if ((this.input !== false) && (this.component !== false) && (this.input.attr('type') === 'color')) {

            this.input.on({
                'click.bs-colorpicker': $.proxy(this.show, this),
                'focus.bs-colorpicker': $.proxy(this.show, this)
            });
        }
        this.update();

        $($.proxy(function () {
            this.element.trigger('create');
        }, this));
    };

    Colorpicker.Color = Color;

    Colorpicker.prototype = {
        constructor: Colorpicker,
        destroy: function () {
            this.picker.remove();
            this.element.removeData('colorpicker').off('.bs-colorpicker');
            if (this.input !== false) {
                this.input.off('.bs-colorpicker');
            }
            if (this.component !== false) {
                this.component.off('.bs-colorpicker');
            }
            this.element.removeClass('bs-colorpicker-element');
            this.element.trigger({
                type: 'destroy'
            });
        },
        reposition: function () {
            if (this.options.inline !== false || this.options.container) {
                return false;
            }
            var type = this.container && this.container[0] !== document.body ? 'position' : 'offset';
            var element = this.component || this.element;
            var offset = element[type]();
            if (this.options.align === 'right') {
                offset.left -= this.picker.outerWidth() - element.outerWidth();
            }
            this.picker.css({
                top: offset.top + element.outerHeight(),
                left: offset.left
            });
        },
        show: function (e) {
            if (this.isDisabled()) {
                return false;
            }
            this.picker.addClass('bs-colorpicker-visible').removeClass('bs-colorpicker-hidden');
            this.reposition();
            $(window).on('resize.bs-colorpicker', $.proxy(this.reposition, this));
            if (e && (!this.hasInput() || this.input.attr('type') === 'color')) {
                if (e.stopPropagation && e.preventDefault) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
            if (this.options.inline === false) {
                $(window.document).on({
                    'mousedown.bs-colorpicker': $.proxy(this.hide, this)
                });
            }
            this.element.trigger({
                type: 'showPicker',
                color: this.color
            });
        },
        hide: function () {
            this.picker.addClass('bs-colorpicker-hidden').removeClass('bs-colorpicker-visible');
            $(window).off('resize.bs-colorpicker', this.reposition);
            $(document).off({
                'mousedown.bs-colorpicker': this.hide
            });
            this.update();
            this.element.trigger({
                type: 'hidePicker',
                color: this.color
            });
        },
        updateData: function (val) {
            val = val || this.color.toString(this.format);
            this.element.data('color', val);
            return val;
        },
        updateInput: function (val) {
            val = val || this.color.toString(this.format);
            if (this.input !== false) {
                if (this.options.colorSelectors) {
                    var color = new Color(val, this.options.colorSelectors);
                    var alias = color.toAlias();
                    if (typeof this.options.colorSelectors[alias] !== 'undefined') {
                        val = alias;
                    }
                }
                this.input.prop('value', val);
            }
            return val;
        },
        updatePicker: function (val) {
            if (val !== undefined) {
                this.color = new Color(val, this.options.colorSelectors);
            }
            var sl = (this.options.horizontal === false) ? this.options.sliders : this.options.slidersHorz;
            var icns = this.picker.find('i');
            if (icns.length === 0) {
                return;
            }
            if (this.options.horizontal === false) {
                sl = this.options.sliders;
                icns.eq(1).css('top', sl.hue.maxTop * (1 - this.color.value.h)).end()
                    .eq(2).css('top', sl.alpha.maxTop * (1 - this.color.value.a));
            } else {
                sl = this.options.slidersHorz;
                icns.eq(1).css('left', sl.hue.maxLeft * (1 - this.color.value.h)).end()
                    .eq(2).css('left', sl.alpha.maxLeft * (1 - this.color.value.a));
            }
            icns.eq(0).css({
                'top': sl.saturation.maxTop - this.color.value.b * sl.saturation.maxTop,
                'left': this.color.value.s * sl.saturation.maxLeft
            });
            this.picker.find('.bs-colorpicker-saturation').css('backgroundColor', this.color.toHex(this.color.value.h, 1, 1, 1));
            this.picker.find('.bs-colorpicker-alpha').css('backgroundColor', this.color.toHex());
            this.picker.find('.bs-colorpicker-color, .bs-colorpicker-color div').css('backgroundColor', this.color.toString(this.format));
            return val;
        },
        updateComponent: function (val) {
            val = val || this.color.toString(this.format);
            if (this.component !== false) {
                var icn = this.component.find('i').eq(0);
                if (icn.length > 0) {
                    icn.css({
                        'backgroundColor': val
                    });
                } else {
                    this.component.css({
                        'backgroundColor': val
                    });
                }
            }
            return val;
        },
        update: function (force) {
            var val;
            if ((this.getValue(false) !== false) || (force === true)) {
                // Update input/data only if the current value is not empty
                val = this.updateComponent();
                this.updateInput(val);
                this.updateData(val);
                this.updatePicker(); // only update picker if value is not empty
            }
            return val;

        },
        setValue: function (val) { // set color manually
            this.color = new Color(val, this.options.colorSelectors);
            this.update(true);
            this.element.trigger({
                type: 'changeColor',
                color: this.color,
                value: val
            });
        },
        getValue: function (defaultValue) {
            defaultValue = (defaultValue === undefined) ? '#000000' : defaultValue;
            var val;
            if (this.hasInput()) {
                val = this.input.val();
            } else {
                val = this.element.data('color');
            }
            if ((val === undefined) || (val === '') || (val === null)) {
                // if not defined or empty, return default
                val = defaultValue;
            }
            return val;
        },
        hasInput: function () {
            return (this.input !== false);
        },
        isDisabled: function () {
            if (this.hasInput()) {
                return (this.input.prop('disabled') === true);
            }
            return false;
        },
        disable: function () {
            if (this.hasInput()) {
                this.input.prop('disabled', true);
                this.element.trigger({
                    type: 'disable',
                    color: this.color,
                    value: this.getValue()
                });
                return true;
            }
            return false;
        },
        enable: function () {
            if (this.hasInput()) {
                this.input.prop('disabled', false);
                this.element.trigger({
                    type: 'enable',
                    color: this.color,
                    value: this.getValue()
                });
                return true;
            }
            return false;
        },
        currentSlider: null,
        mousePointer: {
            left: 0,
            top: 0
        },
        mousedown: function (e) {
            if (!e.pageX && !e.pageY && e.originalEvent) {
                e.pageX = e.originalEvent.touches[0].pageX;
                e.pageY = e.originalEvent.touches[0].pageY;
            }
            e.stopPropagation();
            e.preventDefault();

            var target = $(e.target);

            //detect the slider and set the limits and callbacks
            var zone = target.closest('div');
            var sl = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
            if (!zone.is('.bs-colorpicker')) {
                if (zone.is('.bs-colorpicker-saturation')) {
                    this.currentSlider = $.extend({}, sl.saturation);
                } else if (zone.is('.bs-colorpicker-hue')) {
                    this.currentSlider = $.extend({}, sl.hue);
                } else if (zone.is('.bs-colorpicker-alpha')) {
                    this.currentSlider = $.extend({}, sl.alpha);
                } else {
                    return false;
                }
                var offset = zone.offset();
                //reference to guide's style
                this.currentSlider.guide = zone.find('i')[0].style;
                this.currentSlider.left = e.pageX - offset.left;
                this.currentSlider.top = e.pageY - offset.top;
                this.mousePointer = {
                    left: e.pageX,
                    top: e.pageY
                };
                //trigger mousemove to move the guide to the current position
                $(document).on({
                    'mousemove.bs-colorpicker': $.proxy(this.mousemove, this),
                    'touchmove.bs-colorpicker': $.proxy(this.mousemove, this),
                    'mouseup.bs-colorpicker': $.proxy(this.mouseup, this),
                    'touchend.bs-colorpicker': $.proxy(this.mouseup, this)
                }).trigger('mousemove');
            }
            return false;
        },
        mousemove: function (e) {
            if (!e.pageX && !e.pageY && e.originalEvent) {
                e.pageX = e.originalEvent.touches[0].pageX;
                e.pageY = e.originalEvent.touches[0].pageY;
            }
            e.stopPropagation();
            e.preventDefault();
            var left = Math.max(
                0,
                Math.min(
                    this.currentSlider.maxLeft,
                    this.currentSlider.left + ((e.pageX || this.mousePointer.left) - this.mousePointer.left)
                )
            );
            var top = Math.max(
                0,
                Math.min(
                    this.currentSlider.maxTop,
                    this.currentSlider.top + ((e.pageY || this.mousePointer.top) - this.mousePointer.top)
                )
            );
            this.currentSlider.guide.left = left + 'px';
            this.currentSlider.guide.top = top + 'px';
            if (this.currentSlider.callLeft) {
                this.color[this.currentSlider.callLeft].call(this.color, left / this.currentSlider.maxLeft);
            }
            if (this.currentSlider.callTop) {
                this.color[this.currentSlider.callTop].call(this.color, top / this.currentSlider.maxTop);
            }
            // Change format dynamically
            // Only occurs if user choose the dynamic format by
            // setting option format to false
            if (this.currentSlider.callTop === 'setAlpha' && this.options.format === false) {

                // Converting from hex / rgb to rgba
                if (this.color.value.a !== 1) {
                    this.format = 'rgba';
                    this.color.origFormat = 'rgba';
                }

                // Converting from rgba to hex
                else {
                    this.format = 'hex';
                    this.color.origFormat = 'hex';
                }
            }
            this.update(true);

            this.element.trigger({
                type: 'changeColor',
                color: this.color
            });
            return false;
        },
        mouseup: function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(document).off({
                'mousemove.bs-colorpicker': this.mousemove,
                'touchmove.bs-colorpicker': this.mousemove,
                'mouseup.bs-colorpicker': this.mouseup,
                'touchend.bs-colorpicker': this.mouseup
            });
            return false;
        },
        change: function (e) {
            this.keyup(e);
        },
        keyup: function (e) {
            if ((e.keyCode === 38)) {
                if (this.color.value.a < 1) {
                    this.color.value.a = Math.round((this.color.value.a + 0.01) * 100) / 100;
                }
                this.update(true);
            } else if ((e.keyCode === 40)) {
                if (this.color.value.a > 0) {
                    this.color.value.a = Math.round((this.color.value.a - 0.01) * 100) / 100;
                }
                this.update(true);
            } else {
                this.color = new Color(this.input.val(), this.options.colorSelectors);
                // Change format dynamically
                // Only occurs if user choose the dynamic format by
                // setting option format to false
                if (this.color.origFormat && this.options.format === false) {
                    this.format = this.color.origFormat;
                }
                if (this.getValue(false) !== false) {
                    this.updateData();
                    this.updateComponent();
                    this.updatePicker();
                }
            }
            this.element.trigger({
                type: 'changeColor',
                color: this.color,
                value: this.input.val()
            });
        }
    };

    $.colorpicker = Colorpicker;

    $.fn.colorpicker = function (option) {
        var pickerArgs = arguments,
            rv;

        var $returnValue = this.each(function () {
            var $this = $(this),
                inst = $this.data('colorpicker'),
                options = ((typeof option === 'object') ? option : {});
            if ((!inst) && (typeof option !== 'string')) {
                $this.data('colorpicker', new Colorpicker(this, options));
            } else {
                if (typeof option === 'string') {
                    rv = inst[option].apply(inst, Array.prototype.slice.call(pickerArgs, 1));
                }
            }
        });
        if (option === 'getValue') {
            return rv;
        }
        return $returnValue;
    };

    $.fn.colorpicker.constructor = Colorpicker;

}


// Functions
Array.prototype.findBy = function (key, value) {

    return this.filter(function (el) {

        return el[key] === value;

    })[0];

};

Location.prototype.getDirName = function () {

    var path = this.pathname;
    return path.substring(0, path.lastIndexOf('/'));

};

