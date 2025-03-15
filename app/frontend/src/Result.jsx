import React from 'react';

function Result({ result }) {
  let message = '';
  switch (result.status) {
    case 'ready':
      return (
        <div>
          <span>This is a web interface for the </span>
          <a href="https://github.com/pschanely/CrossHair">CrossHair</a>
          <span> concolic analysis tool.</span>
        </div>
      );
    case 'running':
      return 'Running...';
    case 'succeeded':
      if (result.result.exit_code === 0) {
        message = (
          <div>
            <span>No counterexamples found.</span>
            <br />
            <span>Hoping to find something? File a </span>
            <a href="https://github.com/pschanely/CrossHair/issues/new?labels=missed%20bug&template=bug_report.md">missed bug</a>
            <span> report.</span>
          </div>
        );
      } else {
        message = (
          <div>
            <span>Found a problem! </span>
            <span>(Is a counterexample wrong? Please file a </span>
            <a href="https://github.com/pschanely/CrossHair/issues/new?labels=false%20alarm&template=bug_report.md">false alarm</a>
            <span> report!)</span>
          </div>
        );
      }
      return (
        <div>
          { message }
          <hr />
          <pre>{ result.result.stdout }</pre>
          <pre>{ result.result.stderr }</pre>
        </div>
      );
    case 'failed':
      return `Error: ${result.message}`;
    case 'creating_gist':
      return 'Creating a gist...';
    case 'fetching_gist':
      return 'Fetching a gist...';
    case 'created_gist':
    {
      const { gistUrl, playgroundUrl } = result;
      return (
        <div>
          <span>Gist URL: </span>
          <a href={gistUrl} target="_blank" rel="noopener noreferrer">{gistUrl}</a><br />
          <span>Playground URL: </span>
          <a href={playgroundUrl}>{playgroundUrl}</a><br />
          <hr />
        </div>
      );
    }
    case 'fetched_gist':
      return 'Completed to fetch a Gist!';
    default:
      return `Unexpected error: ${result}`;
  }
}

export default function ResultWrapper({ result }) {
  return (
    <div id="result">
      <Result result={result} />
    </div>
  );
}
