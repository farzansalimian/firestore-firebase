import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import '@material/react-checkbox/dist/checkbox.css';
import Checkbox from '@material/react-checkbox';
import {
    createTask,
    deleteTask,
    filterTasks,
    updateTask
} from '../../store/actions/taskActions';

const tag1 = { id: 'b5imAemVoLRyh3zeKxw7', color: 'red', name: 'tag1' };
const tag2 = { id: 'MzMobtwgG4zpt16jf0yy', color: 'blue', name: 'tag2' };

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag1: true,
            tag2: true
        };
        this.addNewTask = this.addNewTask.bind(this);
    }

    setFilter(tag) {
        this.props.filterTasks(tag);
    }

    addNewTask() {
        const tagIds = [];
        const tags = {};
        if (this.state.tag1) {
            tagIds.push(tag1.id);
            tags[tag1.id] = { color: tag1.color, name: tag1.name };
        }
        if (this.state.tag2) {
            tagIds.push(tag2.id);
            tags[tag2.id] = { color: tag2.color, name: tag2.name };
        }
        const task = {
            title: this.state.newTaskTitle,
            tagIds,
            tags
        };
        this.props.createTask(task);
    }

    renderTasks() {
        return this.props.filteredTasks.map(task => (
            <div className="card m-5 p-2" key={task.id}>
            <div>
            <span className="text-danger">Task Title:</span> {task.title}
        </div>
        <div className="d-flex">
            <span className="text-danger"> Tags:</span>{' '}
        <div className="d-flex">{this.renderTags(task)}</div>
            </div>

            <div className="d-flex">
            {!task.tagIds || !task.tagIds.includes(tag1.id) ? (
            <button
            onClick={() => this.assignTag(task, tag1)}
        className="btn btn-primary m-2"
            >
            Assign Tag 1
        </button>
    ) : null}
        {!task.tagIds || !task.tagIds.includes(tag2.id) ? (
            <button
            onClick={() => this.assignTag(task, tag2)}
            className="btn btn-primary m-2"
                >
                Assign Tag 2
        </button>
        ) : null}
    </div>

        <button
        onClick={() => this.props.deleteTask(task)}
        className="btn btn-primary my-2"
            >
            Delete Task
        </button>
        </div>
    ));
    }

    unAssignTag = (tag, task) => {
        const tags = { ...task.tags };
        const tagIds = task.tagIds.filter(tagId => tagId !== tag.id);
        delete tags[tag.id];
        const updatedTask = { ...task, tags, tagIds };
        this.props.updateTask(updatedTask);
    };

    assignTag = (task, tag) => {
        const newTag = { name: tag.name, color: tag.color };
        const tags = { ...task.tags };
        tags[tag.id] = newTag;
        const oldTagIds = task.tagIds || [];
        const tagIds = oldTagIds.concat();
        tagIds.push(tag.id);
        const updatedTask = { ...task, tags, tagIds };
        this.props.updateTask(updatedTask);
    };

    renderTags(task) {
        if (!task.tags) return;
        const tags = [];
        Object.keys(task.tags).forEach(id => tags.push({ id, ...task.tags[id] }));
        return tags.map(tag => (
            <div className="badge-pill badge-info mx-1" key={`${tag.id}${task.id}`}>
        {tag.name}
    <span
        style={{ cursor: 'pointer' }}
        className="mx-2"
        aria-hidden="true"
        onClick={() => this.unAssignTag(tag, task)}
    >
    &times;
    </span>
        </div>
    ));
    }

    renderModal() {
        return (
            <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
            >
            <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
            Add New Task
        </h5>
        <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
            >
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className="modal-body">
            <input
        className="form-control"
        onChange={e => this.setState({ newTaskTitle: e.target.value })}
        id="newTaskTitle"
        aria-describedby="emailHelp"
        placeholder="Enter Task Title"
            />
            <div className="form-group form-check">
            <Checkbox
        nativeControlId="tag1"
        checked={this.state.tag1}
        onChange={e => this.setState({ tag1: !this.state.tag1 })}
        />
        <label htmlFor="tag1">Tag1</label>
            </div>

            <div className="form-group form-check">
            <Checkbox
        nativeControlId="tag2"
        checked={this.state.tag2}
        onChange={e => this.setState({ tag2: !this.state.tag2 })}
        />
        <label htmlFor="tag2">Tag2</label>
            </div>
            </div>
            <div className="modal-footer">
            <button
        type="button"
        className="btn btn-secondary mx-2"
        data-dismiss="modal"
            >
            Close
            </button>
            <button
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        onClick={this.addNewTask}
            >
            Add
            </button>
            </div>
            </div>
            </div>
            </div>
    );
    }

    renderButtons() {
        return (
            <div>
            <button
        type="button"
        className="btn btn-primary mx-5"
        data-toggle="modal"
        data-target="#exampleModal"
            >
            Add Task
        </button>

        <div className="row justify-content-center my-5">
            <button
        onClick={() => this.setFilter(tag1)}
        className="col-3 btn btn-light"
            >
            Show Task With Tag 1
        </button>
        <button
        onClick={() => this.setFilter(tag2)}
        className="col-3 btn btn-light mx-2"
            >
            Show Task With Tag 2
        </button>
        <button
        onClick={() => this.setFilter()}
        className="col-3 btn btn-light"
            >
            Show All Tasks
        </button>
        </div>
        </div>
    );
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />;

        return (
            <div className="my-5">
            {this.renderButtons()}
        {this.renderTasks()}
        {this.renderModal()}
    </div>
    );
    }
}
const mapDataToArray = (items) => {
    if (!items) return [];
    const result = [];
    Object.keys(items).forEach((id) => {
        if (items[id]) {
            result.push({ id, ...items[id] });
        }
    });
    return result;
};

const mapStateToProps = state =>
    // console.log(state);
    ({
        auth: state.firebase.auth,
        tags: state.firestore.ordered.tags,
        filteredTasks: mapDataToArray(state.firestore.data.filteredTasks)
    });
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            filterTasks,
            deleteTask,
            createTask,
            updateTask
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
