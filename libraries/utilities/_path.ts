// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
const splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
const splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename: any) {
  // Separate device+slash from tail
  const result: any = splitDeviceRe.exec(filename),
    device = (result[1] || '') + (result[2] || ''),
    tail = result[3] || '';
  // Split the tail into dir, basename and extension
  const result2: any = splitTailRe.exec(tail),
    dir = result2[1],
    basename = result2[2],
    ext = result2[3];
  return [device, dir, basename, ext];
}

export const extname = (path: string) => {
  return win32SplitPath(path)[3];
};
