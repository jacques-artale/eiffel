//import { EventCreator } from './EventCreator.js';
import { EventSender } from './EventSender.js';
import { EiffelEventTypes } from './EiffelEventTypes.js';
import { LinkFinder } from './LinkFinder.js';

//const eventCreator = new EventCreator();
const eventSender = new EventSender("http://16.170.107.18:9000");
const eiffelEventTypes = new EiffelEventTypes();
const linkFinder = new LinkFinder();

var events = [];



const dev_makes_branch = eiffelEventTypes.EiffelSourceChangeCreatedEvent([], '', [], 'main branch'); // main?
const art = eiffelEventTypes.EiffelArtifactCreatedEvent([dev_makes_branch.meta.id], 'CAUSE', "Code changes pushed to branch");
const test_case_1 = eiffelEventTypes.EiffelTestCaseTriggeredEvent([art.meta.id], 'IUT', ['']);
const test_case_2 = eiffelEventTypes.EiffelTestCaseTriggeredEvent([art.meta.id], 'IUT', ['']);
const test_run_1 = eiffelEventTypes.EiffelTestCaseStartedEvent([test_case_1.meta.id], 'TEST_CASE_EXECUTION', ['']);
const test_run_2 = eiffelEventTypes.EiffelTestCaseStartedEvent([test_case_2.meta.id], 'TEST_CASE_EXECUTION', ['']);
const test_done_1 = eiffelEventTypes.EiffelTestCaseFinishedEvent([test_case_1.meta.id], 'TEST_CASE_EXECUTION', [''], 'FAILED');
const test_done_2 = eiffelEventTypes.EiffelTestCaseFinishedEvent([test_case_2.meta.id], 'TEST_CASE_EXECUTION', [''], 'PASSED');

const dev_makes_branch_2 = eiffelEventTypes.EiffelSourceChangeCreatedEvent([art.meta.id], 'BASE', [''], 'new branch'); // maybe this should be connected to the first scc

const issue_opened = eiffelEventTypes.CustomTrelloEvent(  
  11,
  "Integration error at index.js",
  "createCard",
  "Trello card created",
  [test_case_1.meta.id],
  'CAUSE',
  ['weak']
);

const art2 = eiffelEventTypes.EiffelArtifactCreatedEvent([dev_makes_branch_2.meta.id], 'CAUSE', "");
const test_case_3 = eiffelEventTypes.EiffelTestCaseTriggeredEvent([art2.meta.id], 'IUT', ['']);
const test_case_4 = eiffelEventTypes.EiffelTestCaseTriggeredEvent([art2.meta.id], 'IUT', ['']);
const test_run_3 = eiffelEventTypes.EiffelTestCaseStartedEvent([test_case_3.meta.id], 'TEST_CASE_EXECUTION', ['']);
const test_run_4 = eiffelEventTypes.EiffelTestCaseStartedEvent([test_case_4.meta.id], 'TEST_CASE_EXECUTION', ['']);

const test_done_3 = eiffelEventTypes.EiffelTestCaseFinishedEvent([test_case_3.meta.id], 'TEST_CASE_EXECUTION', [''], 'PASSED');
const test_done_4 = eiffelEventTypes.EiffelTestCaseFinishedEvent([test_case_4.meta.id], 'TEST_CASE_EXECUTION', [''], 'PASSED');
const dev_merge_branch = eiffelEventTypes.EiffelSourceChangeSubmittedEvent([dev_makes_branch.meta.id, dev_makes_branch_2.meta.id], 'CAUSE', ['', ''], 'merge');

const issue_closed = eiffelEventTypes.CustomTrelloEvent(
  11,
  "Integration solved",
  "updateCard",
  "moved to done",
  [dev_merge_branch.meta.id, issue_opened.meta.id],
  'CAUSE',
  ['weak', 'strong']
);

const issue_deleted = eiffelEventTypes.CustomTrelloEvent(
  11,
  "Integration solved",
  "deleteCard",
  "removed",
  [issue_closed.meta.id],
  'CAUSE',
  ['strong']
);



events.push(dev_makes_branch);
events.push(art);
events.push(test_case_1);
events.push(test_case_2);
events.push(test_run_1);
events.push(test_run_2);
events.push(test_done_1);
events.push(test_done_2);

events.push(issue_opened);

events.push(dev_makes_branch_2);
events.push(art2);
events.push(test_case_3);
events.push(test_case_4);
events.push(test_run_3);
events.push(test_run_4);
events.push(test_done_3);
events.push(test_done_4);
events.push(dev_merge_branch);

events.push(issue_closed);
events.push(issue_deleted);


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

for (let i = 0; i < events.length; i++) {
    eventSender.submitEvent(events[i]);
    await delay(250);
}
