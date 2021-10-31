// User Agent
const u = navigator.userAgent.toLowerCase();

// Test User-Agent
export function test(exp) {
  if (exp.constructor === RegExp) {
    return exp.test(u);
  }
}

// Match Version in User-Agent
export function match(exp) {
  return (u.match(exp) + '').replace(/[^0-9|_.]/g, '').replace(/_/g, '.');
}

// Comparing
export function pare(group, key) {
  if (group.constructor === Array) {
    return group.includes(key);
  }
}

// Ergodic Loop
export function loop(group, callback) {
  for (let key in group) {
    if (callback(group[key], key) === false) {
      break;
    }
  }
}

// Smoke
export function smoke(group, callback, condition = test) {
  loop(group, (value, key) => {
    if (condition(value, key)) {
      return callback(key, value);
    }
  });
}

// Json
export function json(key, value, json = {}) {
  return (json[key] = value), json;
}

// Result
export function result(name, data, source) {
  return Object.assign(source, json(name, data))[name];
}
