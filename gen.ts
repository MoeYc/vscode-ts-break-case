import 'zx/globals'

const run = async () => {
  const files = 1500
  // 20w
  const lines = 20 * 10000

  const oneFileLines = parseInt((lines / files).toString(), 10)

  const tasks: Promise<void>[] = []

  if (fs.existsSync(path.join(__dirname, './src'))) {
    fs.removeSync(path.join(__dirname, './src'))
  }
  fs.mkdirSync(path.join(__dirname, './src'))

  Array(files)
    .fill(0)
    .forEach((_, i) => {
      const p = path.join(__dirname, './src', `file-${i}.ts`)
      let content = Array(oneFileLines)
        .fill(0)
        .map((_, j) => {
          const line = `const a${i}_${j} = 1`
          return line
        })
        .join('\n')
      const importFileNumber = i === files - 1 ? 0 : i + 1
      const importLine = `import './file-${importFileNumber}'`
      content = `${importLine}\n${content}`
      const task = async () => {
        console.log(`Writing ${path.basename(p)}`)
        await fs.writeFile(p, content, 'utf-8')
      }
      tasks.push(task())
    })

  await Promise.all(tasks)
}

run()
