# MCP Server Setup for Claude Code

This document describes the Model Context Protocol (MCP) servers configured for this project.

## What is MCP?

The Model Context Protocol (MCP) is an open standard introduced by Anthropic that enables AI assistants to connect to external data sources and documentation. MCP servers provide Claude Code with direct access to official documentation, ensuring accurate and up-to-date information.

## Configured MCP Servers

### MUI MCP Server

**Status:** ✓ Connected

**Package:** `@mui/mcp@latest`

**Purpose:** Provides comprehensive access to Material UI component library documentation.

**Features:**

- Direct access to Material UI documentation
- Component discovery and usage examples
- Theming and styling system information
- Accessibility guidelines and best practices
- Always up-to-date with latest Material UI docs

## Installation

The MUI MCP server has been installed for this project using:

```bash
claude mcp add mui-mcp -- npx -y @mui/mcp@latest
```

## Configuration

The MCP server configuration is stored in:

- **Global config:** `~/.claude.json`
- **Project config:** `/Users/manzoormehaboob/.claude.json`

Configuration format:

```json
{
  "mui-mcp": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@mui/mcp@latest"]
  }
}
```

## Usage

Now that the MUI MCP server is configured, you can ask Claude Code questions about Material UI components:

### Example Queries

**Component Usage:**

```
"How do I use the MUI Button component with different variants?"
"Show me examples of Material UI TextField with validation"
```

**Theming:**

```
"How do I customize the MUI theme colors?"
"What are the Material UI breakpoint values?"
```

**Best Practices:**

```
"What are the accessibility requirements for MUI Dialog?"
"How should I structure forms using Material UI components?"
```

## Managing MCP Servers

### List all MCP servers:

```bash
claude mcp list
```

### Check server health:

```bash
claude mcp list
```

This will show connection status for all configured servers.

### Remove an MCP server:

```bash
claude mcp remove mui-mcp
```

### Add additional MCP servers:

```bash
claude mcp add <server-name> -- <command> <args>
```

## Available MCP Servers

Here are some popular MCP servers you might want to add:

### Official MUI Servers

- **Material UI:** `@mui/mcp@latest` (already installed)
- **MUI X:** For data grid, date pickers, charts, etc.

### Other Popular Servers

Check the [MCP Servers Registry](https://github.com/modelcontextprotocol/servers) for more options.

## Troubleshooting

### Server not connecting

If the MCP server shows as not connected:

1. **Check if npx is available:**

   ```bash
   which npx
   ```

2. **Test the server manually:**

   ```bash
   npx -y @mui/mcp@latest
   ```

3. **Restart Claude Code:**
   Close and reopen your Claude Code session to reload MCP configurations.

4. **Check logs:**
   Look for error messages in the Claude Code output.

### Removing and re-adding

If you need to reset the configuration:

```bash
# Remove the server
claude mcp remove mui-mcp

# Add it back
claude mcp add mui-mcp -- npx -y @mui/mcp@latest
```

## Benefits

With the MUI MCP server integrated:

✅ **Accurate information** - Direct from Material UI official docs
✅ **Always up-to-date** - Fetches latest documentation
✅ **Faster development** - Quick access to component examples
✅ **Best practices** - Built-in accessibility and usage guidelines
✅ **Consistent code** - Ensures proper Material UI implementation

## Additional Resources

- [MUI Documentation](https://mui.com/)
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- [Anthropic MCP Guide](https://docs.anthropic.com/claude/docs/model-context-protocol)
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)

## Notes

- MCP servers run locally and communicate via stdio transport
- No external API keys required for MUI MCP
- The server is automatically started when Claude Code needs it
- Multiple MCP servers can run simultaneously
