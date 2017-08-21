import React from 'react';
import {browserHistory} from 'react-router';

import {t} from '../../locale';
import SearchBar from '../../components/searchBar.jsx';
import SpreadLayout from '../../components/spreadLayout';
import FingerprintsView from './fingerprintsView';
import GroupAllEvents from './groupAllEvents';

const GroupEventsView = React.createClass({
  getInitialState() {
    let queryParams = this.props.location.query;
    return {
      query: queryParams && queryParams.query
    };
  },

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.params.groupId !== this.props.params.groupId ||
      nextProps.location.search !== this.props.location.search
    ) {
      let queryParams = nextProps.location.query;
      this.setState({
        query: queryParams.query
      });
    }
  },

  onSearch(query) {
    let targetQueryParams = {};
    if (typeof query !== 'undefined') targetQueryParams.query = query;

    let {groupId, orgId, projectId} = this.props.params;
    browserHistory.pushState(
      null,
      `/${orgId}/${projectId}/issues/${groupId}/events/`,
      targetQueryParams
    );
  },

  render() {
    // TODO(billy): need navigation for GroupAllEvents
    let showFingerprints = typeof this.state.query !== 'string';

    return (
      <div className="group-events-container">
        <div className="alert alert-block alert-warning">
          <strong>{t('Warning')}:</strong>
          {' '}
          {t(
            'Unmerging is an experimental feature. Data may not be immediately available while we process the unmerge.'
          )}
        </div>

        <SpreadLayout responsive style={{marginBottom: 20}}>
          <h2>Events {showFingerprints ? 'grouped by fingerprint' : ''}</h2>
          <SearchBar
            defaultQuery=""
            placeholder={t('search event message or tags')}
            query={this.state.query}
            onSearch={this.onSearch}
          />
        </SpreadLayout>

        {showFingerprints
          ? <FingerprintsView {...this.props} />
          : <GroupAllEvents query={this.state.query} {...this.props} />}
      </div>
    );
  }
});

export default GroupEventsView;
