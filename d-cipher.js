/**
 * Created by zerkalenkov on 05.08.15.
 */
(function (window, document) {

    var Strings = {

        en: {

            _Recording: 'Recording',
            _Clicks: 'Clicks',
            _Events: 'Events',
            _Type: 'Type',
            _Time: 'Time',
            _Mouse_miles: 'Mouse miles',
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
            _Session_name: 'Session name',
            _Created: 'Created',
            _Modified: 'Modified',
            _Author: 'Author',
            _Duration: 'Duration',
            _Relative_mouse_speed: 'Relative mouse speed',
            _Miles_sec: 'Mouse miles in sec',
            _Events_sec: 'Events in sec',
            _Clicks_sec: 'Clicks in sec',
            _KPI: "KPI",
            _KPI_event: "KPI Event",

            mouseover: 'Mouse over',
            mousedown: 'Mouse down',
            mousemove: 'Mouse move',
            mouseup: 'Mouse up',
            click: 'Click',
            dblclick: 'Double click',
            keydown: 'Key down',
            wheel: 'Wheel',
            mousewheel: 'Wheel',
            DOMMouseScroll: 'Wheel'
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
            butList: 'd-cipher-menu-but-list',
            stat: 'd-cipher-stat',
            timeline: 'd-cipher-timeline',
            click: 'd-cipher-click',
            dblClick: 'd-cipher-dblclick',
            records: 'd-cipher-rec-list',
            mTooltip: 'd-cipher-m-tooltip',
            eventInfo: 'd-cipher-event-info'

        };

        this.mouse = {

            x: 0,
            y: 0

        };

        this.db = new IDB();
        this.user = {};
        this.sessionId = '';
        this.sessionRec = null;
        this.eventIndex = 0;
        this.appMode = '';
        this.eventsUnderMouse = [];
        this.clickDelay = 200;

        this.init = function init() {

            var self = this;

            self.db.init();
            self.db.getAllRecords().done(function () {

                var recList = self.getDomElement('records');

                self.createRecordList();
                self.restoreState();

                $(recList).on('mouseout', function () {

                    $(recList).data('tid', setTimeout(function () {

                        $(recList).hide();

                    }, 1000));

                });

                $(recList).on('mouseover', function () {

                    clearTimeout($(recList).data('tid'));

                    console.debug('---> mouseover');
                });

                $('body').on('mousemove', {self: self}, self.mouseMoveHandler);

                $('document').ready(function () {

                    self.setupDOMListeners();

                });

            });

        };

        this.toggleRecMode = function toggleRecMode(e) {

            var self = this,
                cnvh = this.getDomElement('canvasHolder'),
                $stat = $(this.getDomElement('stat'));

            function updateStats() {

                self.updateStatString();

            }


            if (this.appMode === '') {

                // Turn on record mode
                this.appMode = 'record';

                var ts = 1 * new Date();
                $('div', this.getDomElement('butRecord')).removeClass('rec').addClass('stop');
                $(cnvh).hide();
                $(this.getDomElement('butList')).hide();
                $stat.data('tid', setInterval(updateStats, 100)).fadeIn();
                this.hideRecList();
                this.sessionId = ts.toString();
                this.sessionRec = {

                    id: this.sessionId,
                    name: '',
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

                var rec = this.sessionRec;

                $stat.fadeOut();
                clearInterval($stat.data('tid'));
                rec.duration = rec.events[rec.events.length - 1].time;
                rec.kpi = rec.events[rec.events.length - 1].kpi;

                if (this.db.records.length) {

                    $(this.getDomElement('butList')).show();

                }

                if (rec.events.length) {

                    rec.mouseMilesTotal = this.getNDCMousePath(rec);

                    this.db.putRecord(this.sessionId, rec).then(function () {

                        $(self.getDomElement('butList')).show();
                        self.createRecordList();
                        self.toggleRecList();
                        $(':last-child > input', self.getDomElement('records')).attr('disabled', false).focus();
                        self.setActiveRecord(self.sessionId);
                        self.showSpiderGraph(self.sessionId);
                        self.sessionRec = null;

                    });

                }

            }

            return this;

        };

        this.saveEvent = function saveEvent(e) {

            var etype = e.type,
                etarget = e.target || document.getElementsByTagName('body')[0];

            console.debug('Event type: %s, target: %s; record: %s', etype, etarget, !$(this.getDomElement('container')).find(etarget).length);

            if (this.appMode === 'record' && !$(this.getDomElement('container')).find(etarget).length) {

                //console.debug('--> x, %s, y: %s', e.clientX, e.clientY);

                var rec = this.sessionRec,
                    events = rec.events,
                    lastEvent = events[events.length - 1] || null,
                    milesTotal = this.getNDCMousePath(rec),
                    clientNDC = this.getNDC(e.clientX, e.clientY),
                    pageNDC = this.getNDC(e.pageX, e.pageY),
                    pageOffsetNDC = this.getNDC(pageXOffset, pageYOffset),
                    $el = $(etarget),
                    offs = $el.offset(),
                    left = offs.left,
                    top = offs.top,
                    event = {
                        recId: this.sessionId,
                        timeStamp: e.timeStamp,
                        location: document.location.href,
                        ndc: {
                            x: clientNDC.x,
                            y: clientNDC.y,
                            pageX: pageNDC.x,
                            pageY: pageNDC.y,
                            pageXOffset: pageOffsetNDC.x,
                            pageYOffset: pageOffsetNDC.y
                        },
                        bubbles: !etype.match(/wheel|scroll/i),
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
                            treePath: this.getTreePath(etarget),
                            tagName: etarget.tagName,
                            localName: etarget.localName,
                            name: etarget.name,
                            title: etarget.title,
                            id: etarget.id,
                            className: etarget.className,
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

                if (!etype.match(/wheel|scroll/i) || !lastEvent || lastEvent.type.match(/wheel|scroll/i)) {

                    rec.eventsStat[etype] = rec.eventsStat[etype] ? rec.eventsStat[etype] + 1 : 1;
                    event.eventNo = rec.eventsStat[etype];

                }

                event.kpi = event.milesLast / (event.miles * rec.eventsStat['click']);
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
            console.log('DOM listeners has been set up...');

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

            return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));

        };

        this.getNDCMousePath = function getTotalMousePath(rec) {

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

        this.showMouseTooltip = function showMouseTooltip(event) {

            var self = event.data.self,
                loc = self.loc,
                $tt = $(self.getDomElement('mTooltip')),
                cnvh = self.getDomElement('canvasHolder'),
                x = event.clientX, y = event.clientY,
                evts = self.getEventsUnderMouse(x, y),
                html = '', evt, rec,
                w, h, top, left;

            function getEventInfo(e) {

                var rId = e.recId,
                    rec = self.getRecordById(rId),
                    etarget = e.target,
                    html = '';

                if (etarget.dcipherName) {

                    html += loc._Target + ': ' + etarget.dcipherName + '<br />';

                }

                if (etarget.dcipherAction) {

                    html += loc._Action + ': ' + etarget.dcipherAction + '<br />';

                }

                html += loc._Session_name + ': ' + rec.name + '<br />'
                        + loc._Time + ': ' + self.getTimeString(e.time) + ' ' + loc._from + ' ' + self.getTimeString(rec.duration) + '<br />'
                        + loc._Mouse_miles + ': ' + e.miles.toFixed(2) + ' ' + loc._from + ' ' + rec.mouseMilesTotal.toFixed(2) + '<br />'
                        + loc._Event + ': ' + loc[e.type] + '<br />'
                        + loc._KPI_event + ': ' + e.kpi.toFixed(2);

                return html;
            }

            if (evts.length) {

                $(cnvh).css('cursor', 'pointer');

                evt = evts[0];
                rId = evt.recId;
                html += getEventInfo(evt);

                evts.forEach(function (e) {

                    rec = self.getRecordById(rId);

                    if (rId !== e.recId) {

                        rId = e.recId;
                        html += getEventInfo(e);

                    }

                    html += '<br />' + loc[e.type] + ' (' + e.eventNo + ' ' + loc._from + ' ' + rec.eventsStat[e.type] + ') ';

                });

                $tt.html(html);
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

                $tt.css('top', top).css('left', left)
                    .show();

            } else {

                $(self.getDomElement('eventInfo')).hide();
                $(cnvh).css('cursor', 'default');
                $tt.hide();

            }

            //console.debug(html);

        };

        this.showEventsInfo = function () {

            var self = this,
                loc = this.loc,
                evts = this.eventsUnderMouse,
                $eInf = $(this.getDomElement('eventInfo')),
                dx = 0, dy = 0, html = '', rec,
                top, left, x, y, w, h, shift = 10;

            evt = evts[0];
            rId = evt.recId;
            rec = self.getRecordById(rId);

            function getRecordInfo(rec) {

                var clicks = rec.eventsStat['click'];

                return loc._Session_name + ': ' + rec.name + '<br />'
                       + loc._Created + ': ' + (new Date(rec.created)).toLocaleString() + '<br />'
                       + loc._Modified + ': ' + (new Date(rec.modified)).toLocaleString() + '<br />'
                       + loc._Author + ': ' + rec.author + '<br />'
                       + loc._Clicks + ': ' + clicks + ', '
                       + loc._Duration + ': ' + self.getTimeString(rec.duration) + '<br />'
                       + loc._Mouse_miles + ': ' + rec.mouseMilesTotal.toFixed(2) + ', '// + '<br />'
                       + loc._Events + ': ' + rec.events.length + '<br />'
                       + loc._KPI + ': ' + rec.kpi + '<br />'
                       + loc._Clicks_sec + ': ' + (1000 * clicks / rec.duration).toFixed(1) + '<br />'
                       + loc._Miles_sec + ': ' + (1000 * rec.mouseMilesTotal / rec.duration).toFixed(2);
            }

            html += getRecordInfo(rec);

            evts.forEach(function (e) {

                dx += e.x;
                dy += e.y;

                if (rId !== e.recId) {

                    rId = e.recId;
                    rec = self.getRecordById(rId);
                    html += '<br /><br />' + getRecordInfo(rec);

                }

                html += '<br />' + self.getTimeString(e.time) + ' (' + self.getTimeString(e.duration) + ') ' + loc[e.type]
                        + ' #' + e.eventNo
                        + ' (' + e.milesLast.toFixed(2) + ' / ' + e.miles.toFixed(2) + ')';

            });

            $eInf.html(html);
            w = $eInf.outerWidth();
            h = $eInf.outerHeight();
            x = dx / evts.length;
            y = dy / evts.length;

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

            var recs = this.db.records,
                abs = Math.abs,
                th = 5,
                evts = [];

            recs.forEach(function (r) {

                if (r.active && r.visible) {

                    var ea = r.events.filter(function (e, i, arr) {

                        console.log();

                        return abs(x - e.x) < th && abs(y - e.y) < th
                               && (!i || !e.type.match(/wheel|scroll/i) || !arr[i - 1].type.match(/wheel|scroll/i));

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

                self.showEventsInfo();

            }

        };

        this.updateStatString = function updateStatString(e) {

            var loc = this.loc,
                rec = this.sessionRec,
                ms = rec.modified,
                timeString = this.getTimeString(1 * new Date() - ms),
                clicks = rec.eventsStat.click || 0,
                el = document.elementFromPoint(this.mouse.x, this.mouse.y),
                trg = el.name || el.id || el.className,
            //type = e ? loc[e.type] : '',
                msg = ''; //loc._Recording + '.';

            msg += /*loc._Time + ': ' +*/ timeString + ' ';
            msg += loc._Mouse_miles + ': ' + rec.mouseMilesTotal.toFixed(2) + '  ';
            msg += loc._Clicks + ': ' + clicks + '  ';
            //msg += loc._Type + ': ' + type + '; ';
            if (trg) {

                msg += loc._Target + ': ' + trg + '; ';

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
                hours, mins, secs;

            hours = Math.floor(time / 3600);
            hours = hours < 10 ? '0' + hours : hours;
            mins = Math.floor((time - hours * 3600) / 60);
            mins = mins < 10 ? '0' + mins : mins;
            secs = Math.floor(time - hours * 3600 - mins * 60);
            secs = secs < 10 ? '0' + secs : secs;

            return hours + ':' + mins + ':' + secs;

        };

        this.getRecordById = function getRecordById(id) {

            var records = this.db.records,
                r = [];

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
            this.clearTimeline();

        };

        this.showSpiderGraph = function showSpiderGraph(sId, start, end) {

            var rec = this.getRecordById(sId),
                cnvh = this.getDomElement('canvasHolder'),
                cnv = $('#cnvId-' + rec.id, cnvh)[0];

            $(cnvh).show();
            $(cnv).show();

            if (rec.drawn) {

                $('canvas[data-dcipher-rec-id=' + sId + ']', cnvh).show();

            } else {

                this.drawSpiderGraph(sId, start, end);

            }

            rec.visible = true;

        };

        this.drawSpiderGraph = function showSpiderGraph(sId, start, end) {

            var self = this,
                cnvh = this.getDomElement('canvasHolder'),
                rec = this.getRecordById(sId),
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

                } else if (!pe || !pe.type.match(/wheel|scroll/i) || !e.type.match(/wheel|scroll/i)) {

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

                $(cnvh).show().on('mousemove', {self: this}, this.showMouseTooltip);
                $(cnv).show();
                rec.drawn = true;
                this.checkRecordCheckbox(sId);

            }

            return this;

        };

        this.clearTimeline = function clearTimeline() {

            var cnv = $('canvas', this.getDomElement('timeline'))[0],
                ctx = cnv.getContext('2d'),
                cw = window.innerWidth,
                ch = $(this.getDomElement('timeline')).height();

            ctx.clearRect(0, 0, cw, ch);

        };

        this.drawTimeline = function drawTimeline(rec, start, end) {

            var self = this,
                events = rec.events,
                cnv = $('canvas', this.getDomElement('timeline'))[0],
                ctx = cnv.getContext('2d'),
                cw = window.innerWidth,
                ch = $(this.getDomElement('timeline')).height(),
                offsetRight = 200,
                offsetLeft = 100,
                offsetTop = ch / 2,
                width = cw - offsetLeft - offsetRight,
                pxs = width / rec.duration,
                posx = offsetLeft, posx0, pe;

            cnv.width = cw;
            cnv.height = ch;
            $(cnv).width(cw);
            $(cnv).height(ch);

            ctx.lineWidth = 2.0;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = rec.color;
            ctx.clearRect(0, 0, cw, ch);
            ctx.moveTo(offsetLeft, offsetTop);
            events.forEach(function (e, i, arr) {

                //console.debug('---> posx:', posx);
                //console.debug('---> e.time:', e.time);

                //ne = arr[i + 1];
                pe = arr[i - 1];
                posx0 = posx;
                posx = offsetLeft + pxs * e.time;
                ctx.beginPath();
                ctx.moveTo(posx0, offsetTop);
                //if (ne && ne.drag) {
                if (e.drag) {

                    ctx.setLineDash([3, 3]);

                }
                ctx.lineTo(posx, offsetTop);
                ctx.stroke();
                ctx.setLineDash([]);

                if (i) {

                    ctx.beginPath();
                    if (!e.type.match(/wheel|scroll/i)) {

                        self.drawEventPict(ctx, pe.type, posx0, offsetTop);

                    } else if (!pe.type.match(/wheel|scroll/i)) {

                        self.drawEventPict(ctx, 'wheel', posx0, offsetTop);

                    }

                    ctx.stroke();
                    ctx.fill();

                }

            });

             e = events[events.length - 1];
            if (!e.type.match(/wheel|scroll/i)) {

                self.drawEventPict(ctx, e.type, posx, offsetTop);

            } else if (!pe || !pe.type.match(/wheel|scroll/i)) {

                self.drawEventPict(ctx, 'wheel', posx, offsetTop);

            }

            ctx.stroke();
            ctx.fill();

        };

        this.drawEventPict = function (ctx, type, x, y) {

            var endAngle = 2 * Math.PI, d = 3;

            if (type === 'start') {

                ctx.moveTo(x - 1, y - 3);
                ctx.lineTo(x - 1, y + 3);

            } else if (type === 'click') {

                ctx.moveTo(x + d, y);
                ctx.arc(x, y, d, 0, endAngle, true);

            } else if (type === 'dblclick') {

                ctx.moveTo(x + d, y);
                ctx.arc(x, y, d, 0, endAngle, true);
                ctx.moveTo(x + 2 * d, y);
                ctx.arc(x, y, 2 * d, 0, endAngle, true);

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

        };

        this.playSession = function playSession(sId, eventIndex) {

            var self = this,
                cnt = eventIndex || 0,
                delay = 20, speed = 2,
                rec = this.getRecordById(sId),
                sData = rec.events,
                pars = this.getTargetScreenPars(sData[cnt]),
                el = pars.element,
                cnvh = this.getDomElement('canvasHolder'),
                cnv = $('#cnvId-' + rec.id, cnvh)[0],
                ctx = cnv.getContext('2d'),
                $cur = $(self.getDomElement('cursor')),
                clickDelay = this.clickDelay,
                mOverElement,
                mOverClass = self.domId['mouseOverClass'];

            function playEvent(pars) {

                var e = sData[cnt],
                    etype = e.type;

                pars = pars || self.getTargetScreenPars(e);
                el = pars.element;
                self.eventIndex = cnt;

                //console.debug('--> playSession: event No: %s, event type: %s', cnt, etype);
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

                    var dur = e2.timeStamp - e1.timeStamp,
                        pars1 = pars || self.getTargetScreenPars(e1),
                        pars2 = self.getTargetScreenPars(e2),
                        step = 0,
                        steps = dur / speed / delay,
                        dx = pars2.x - pars1.x,
                        dy = pars2.y - pars1.y,
                        mouseDown = e1.type === 'mousedown' && e2.type === 'mouseup';

                    function drawStep() {

                        var x0, y0, x, y, el;

                        x0 = pars1.x + dx * step;
                        y0 = pars1.y + dy * step;
                        step++;

                        if (step < steps) {

                            x = pars1.x + dx * step;
                            y = pars1.y + dy * step;
                            setTimeout(drawStep, delay);

                        } else {

                            x = pars2.x;
                            y = pars2.y;
                            setTimeout(function () {

                                playEvent(pars2);

                            }, clickDelay);

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
                                    $(mOverElement).removeClass(mOverClass);

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

                    if (dx || dy && (e1.type === e2.type && !e1.type.match(/wheel|scroll/i))) {

                        if (steps) {

                            dx = dx / steps;
                            dy = dy / steps;

                        }
                        //console.debug('--> moveCursor->drawStep: dx: %s, dy: %s', dx, dy);
                        setTimeout(drawStep, delay);

                    } else {

                        setTimeout(function () {

                            playEvent(pars2);

                        }, 10);

                    }

                } else {

                    // End of play
                    $cur.hide();
                    $(mOverElement).removeClass(mOverClass);
                    self.removeMouseOverStyle();
                    $(cnv).css('cursor', 'default');
                    self.drawSpiderGraph(rec.id, 0, cnt);
                    self.appMode = '';
                    self.sessionRec = null;
                    sessionStorage.removeItem('dcipherState');

                }

            }

            this.appMode = 'play';
            this.sessionId = sId;
            this.sessionRec = rec;

            // Reload initial session location on replay start
            if (!cnt && window.location.toString() !== sData[0].location) {

                this.eventIndex = 1;
                window.location = sData[0].location;
                return;

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
            this.hideRecList();
            this.setActiveRecord(sId);
            //ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
            ctx.strokeStyle = rec.color;

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

            if (el.className) {

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

            $rl.css('top', p.top - window.pageYOffset + ($butList.outerHeight() - $rl.outerHeight()) / 2)
                .css('left', p.left - window.pageXOffset + 1.5 * $butList.outerWidth());

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
                butPlay = document.createElement('div');
                butPlay.setAttribute('data-dcipher-rec-id', r.id);
                butPlay.id = 'playRecId-' + r.id;
                butPlay.className = 'play';
                butPlay.title = dCipher.loc._Play_record;
                rec.appendChild(butPlay);

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

                        self.unsetActiveRecord($el.attr('data-dcipher-rec-id'));

                    }

                });

                butDel.addEventListener('click', function () {

                    self.deleteRecord($(this).attr('data-dcipher-rec-id'));

                });

                butPlay.addEventListener('click', function () {

                    self.playSession($(this).attr('data-dcipher-rec-id'));

                });

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

                        self.setActiveRecord(id);
                        self.showSpiderGraph(id);

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
                    align: 'left',
                    customClass: 'cp-pos',
                    colorSelectors: ['magenta', 'red', 'orange', 'yellow', 'limegreen', 'aqua', 'lightseagreen', 'royalblue', 'silver', 'gray', 'black']

                }).on('hidePicker.bs-colorpicker', function () {
                    //
                    var $el = $(this);

                    self.updateRecordColor($el.attr('data-dcipher-rec-id'), $el.colorpicker('getValue'));

                });

            });

        };

        this.setActiveRecord = function setActiveRecord(id) {

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
                    self.drawTimeline(r);

                } else {

                    r.active = false;

                }

            });

            if (!$chkb.prop('checked')) {

                $chkb.prop('checked', true);

            }

        };

        this.unsetActiveRecord = function unsetActiveRecord(id) {

            $('#recId-' + id, this.getDomElement('records')).removeClass('active');
            this.getRecordById(id).active = false;
            this.hideSpiderGraph(id);

        };

        this.deleteRecord = function deleteRecord(id) {

            var self = this;

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

                sessionStorage.setItem('dcipherState', JSON.stringify({

                    user: this.user,
                    appMode: this.appMode,
                    sessionRec: this.sessionRec,
                    sessionId: this.sessionId,
                    eventIndex: this.eventIndex

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

            if (this.appMode === 'record') {

                $('div', this.getDomElement('butRecord')).removeClass('rec').addClass('stop');
                $(this.getDomElement('butList')).hide();
                $(this.getDomElement('stat')).data('tid', setInterval(function updateStats() {

                    self.updateStatString();

                }, 100)).fadeIn();

            } else if (this.appMode === 'play') {

                this.showSpiderGraph(this.sessionRec.id, 0, this.eventIndex + 1);
                this.playSession(this.sessionRec.id, this.eventIndex);

            }

        };

        this.resetState = function resetState() {

            sessionStorage.removeItem('dcipherState');
            if (this.sessionRec) {

                var loc = this.sessionRec.events[0].location;

                this.sessionRec = null;
                this.appMode = '';
                this.eventIndex = 0;
                window.location = loc;

            }

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
            butList = document.createElement('div'),
            recs = document.createElement('div'),
            recList = document.createElement('div'),
            click = document.createElement('div'),
            dblclick = document.createElement('div'),
            cursor = document.createElement('div'),
            mTT = document.createElement('div'),
            eInf = document.createElement('div'),
            tLine = document.createElement('div'),
            tlCnv = document.createElement('canvas'),
            tlCtx = tlCnv.getContext('2d');

        // D-Cipher container
        dMain.id = dCipher.domId.container;
        bdy.appendChild(dMain);

        // Init styles
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.media = 'all';
        link.href = dCipher.baseURL + dCipher.cssURL;
        document.body.insertBefore(link, document.getElementById(dMain.id));

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

        // Cursor
        cursor.id = dCipher.domId.cursor;
        cnvDiv.appendChild(cursor);

        // Time line
        tLine.id = dCipher.domId.timeline;
        tLine.appendChild(tlCnv);
        cnvDiv.appendChild(tLine);

        // Mouse tooltip
        mTT.id = dCipher.domId.mTooltip;
        dMain.appendChild(mTT);

        // Event info popup
        eInf.id = dCipher.domId.eventInfo;
        dMain.appendChild(eInf);

        // Record button
        butRec.id = dCipher.domId.butRecord;
        butRec.className = 'btn';
        butRec.title = dCipher.loc._Record_session;
        rec.className = 'rec';
        butRec.appendChild(rec);

        // Play button
        butPlay.className = 'btn';
        play.className = 'play';
        butPlay.style.display = 'none';
        butPlay.appendChild(play);

        // Record list button
        butList.id = dCipher.domId.butList;
        butList.className = 'btn';
        recs.className = 'recs';
        butList.title = dCipher.loc._Show_records;
        butList.appendChild(recs);

        // Record list
        recList.id = 'd-cipher-rec-list';

        // D-Cipher menu
        menu.id = dCipher.domId.menu;
        menu.appendChild(butRec);
        menu.appendChild(butPlay);
        menu.appendChild(butList);
        dMain.appendChild(menu);
        dMain.appendChild(recList);

        cnvDiv.addEventListener('click', function (e) {

            dCipher.canvasHolderClickHandler(e, dCipher);

        });

        butRec.addEventListener('click', function (e) {

            dCipher.toggleRecMode(e);

        });

        butPlay.addEventListener('click', function () {

            dCipher.playSession();

        });

        butList.addEventListener('click', function () {

            dCipher.toggleRecList(this);

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

        window.addEventListener('unload', function () {

            dCipher.saveState();

        });

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

                if (handler.toString().match(/stopPropagation|preventDefault/) || type === 'mouseover' || type === 'mouseenter' || type === 'mouseout' || type === 'mouseleave') {

                    node._addEventListener(type, function (e) {

                        dCipher.saveEvent(e);

                    });

                    console.debug('JS listener --> Element: %s, Event added: ', this, type);
                    console.debug('Handler: ', handler.toString());

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

            if (node.eventListenerList[type]) {

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

        }

    }

    document.addEventListener('DOMContentLoaded', initDomElements);
    overridePrototype();

})(window, document);

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

};

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
};

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

};


