export const LOCATION_ACTION_TYPE = 'LOCATION';

export function locationAction(location) {
  return {
    type: LOCATION_ACTION_TYPE,
    payload: location
  };
}
